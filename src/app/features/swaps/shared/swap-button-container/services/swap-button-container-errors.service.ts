import { Injectable, NgZone } from '@angular/core';
import { SwapFormService } from '@features/swaps/features/main-form/services/swap-form-service/swap-form.service';
import { ERROR_TYPE } from 'src/app/features/swaps/shared/swap-button-container/models/error-type';
import { BIG_NUMBER_FORMAT } from '@shared/constants/formats/big-number-format';
import BigNumber from 'bignumber.js';
import { WithRoundPipe } from '@shared/pipes/with-round.pipe';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TargetNetworkAddressService } from '@features/swaps/shared/target-network-address/services/target-network-address.service';
import { map, startWith } from 'rxjs/operators';
import { BlockchainsInfo, Web3Pure } from 'rubic-sdk';
import { AuthService } from '@core/services/auth/auth.service';
import { WalletConnectorService } from '@core/services/wallets/wallet-connector-service/wallet-connector.service';
import { SwapsService } from '@features/swaps/core/services/swaps-service/swaps.service';
import { SWAP_PROVIDER_TYPE } from '@features/swaps/features/main-form/models/swap-provider-type';
import { IframeService } from '@core/services/iframe/iframe.service';
import { SwapFormInput } from '@features/swaps/features/main-form/models/swap-form';
import { QueryParamsService } from '@app/core/services/query-params/query-params.service';
import { isNil } from '@app/shared/utils/utils';
import { fromBlockchains } from '@features/swaps/shared/tokens-select/constants/from-blockchains';
import { blockchainLabel } from '@shared/constants/blockchain/blockchain-label';
import { SettingsService } from '@features/swaps/features/main-form/services/settings-service/settings.service';

@Injectable()
export class SwapButtonContainerErrorsService {
  /**
   * Either contains error's text.
   */
  private readonly _errorBody$ = new BehaviorSubject<{
    type: ERROR_TYPE;
    text: string;
  }>(undefined);

  /**
   * True if checking of error is in progress.
   */
  private readonly _errorLoading$ = new BehaviorSubject<boolean>(false);

  public readonly errorLoading$ = this._errorLoading$.asObservable();

  public readonly error$: Observable<{
    type: ERROR_TYPE | null;
    text: string;
    loading: boolean;
  }> = combineLatest([this._errorBody$, this._errorLoading$]).pipe(
    map(([errorBody, loading]) => ({
      ...errorBody,
      loading
    }))
  );

  private errorType: Record<ERROR_TYPE, boolean> = Object.values(ERROR_TYPE).reduce(
    (acc, key) => ({
      ...acc,
      [key]: false
    }),
    {}
  ) as Record<ERROR_TYPE, boolean>;

  private minAmount: string;

  private minAmountTokenSymbol: string;

  private maxAmount: string;

  private maxAmountTokenSymbol: string;

  private translateSub$: Subscription;

  constructor(
    private readonly swapFormService: SwapFormService,
    private readonly swapsService: SwapsService,
    private readonly queryParamsService: QueryParamsService,
    private readonly withRoundPipe: WithRoundPipe,
    private readonly translateService: TranslateService,
    private readonly targetNetworkAddressService: TargetNetworkAddressService,
    private readonly walletConnectorService: WalletConnectorService,
    private readonly authService: AuthService,
    private readonly iframeService: IframeService,
    private readonly settingsService: SettingsService,
    private readonly ngZone: NgZone
  ) {
    this.subscribeOnSwapForm();
    this.subscribeOnSwapMode();
    this.subscribeOnWalletNetwork();
    this.subscribeOnAuth();
    this.subscribeOnTargetNetworkAddress();
  }

  private subscribeOnSwapForm(): void {
    this.swapFormService.inputValueChanges
      .pipe(startWith(this.swapFormService.inputValue))
      .subscribe((form: SwapFormInput) => {
        const { fromAmount } = form;
        this.errorType[ERROR_TYPE.NO_AMOUNT] = !fromAmount?.gt(0);

        this.checkWalletSupportsFromBlockchain();
        this.checkSelectedToken();
        this.checkUserBlockchain();
        this.checkUserBalance();

        this.updateError();
      });
  }

  private subscribeOnSwapMode(): void {
    this.swapsService.swapMode$.subscribe(swapMode => {
      if (swapMode === SWAP_PROVIDER_TYPE.INSTANT_TRADE) {
        this.setMinAmountError(false);
        this.setMaxAmountError(false);
      }
    });
  }

  private subscribeOnWalletNetwork(): void {
    this.walletConnectorService.networkChange$.subscribe(() => {
      this.checkUserBlockchain();

      this.updateError();
    });
  }

  private subscribeOnAuth(): void {
    this.authService.currentUser$.subscribe(() => {
      this.checkWalletSupportsFromBlockchain();
      this.checkUserBalance();

      this.updateError();
    });
  }

  private subscribeOnTargetNetworkAddress(): void {
    combineLatest([
      this.targetNetworkAddressService.isAddressValid$,
      this.swapsService.swapMode$,
      this.settingsService.instantTradeValueChanges.pipe(
        startWith(this.settingsService.instantTradeValue)
      ),
      this.settingsService.crossChainRoutingValueChanges.pipe(
        startWith(this.settingsService.crossChainRoutingValue)
      )
    ]).subscribe(
      ([isAddressValid, swapMode, instantTradesSettingsForm, crossChainSettingsForm]) => {
        let isWithReceiverAddress = false;

        switch (swapMode) {
          case SWAP_PROVIDER_TYPE.INSTANT_TRADE:
            isWithReceiverAddress = instantTradesSettingsForm.showReceiverAddress;
            break;
          case SWAP_PROVIDER_TYPE.CROSS_CHAIN_ROUTING:
            isWithReceiverAddress = crossChainSettingsForm.showReceiverAddress;
            break;
        }

        this.errorType[ERROR_TYPE.INVALID_TARGET_ADDRESS] =
          isWithReceiverAddress && !isAddressValid;

        this.updateError();
      }
    );
  }

  /**
   * Checks that from blockchain can be used for current wallet.
   */
  private checkWalletSupportsFromBlockchain(): void {
    const fromToken = this.swapFormService.inputValue.fromToken;
    if (!fromToken) {
      this.errorType[ERROR_TYPE.WRONG_WALLET] = false;
      return;
    }

    const chainType = BlockchainsInfo.getChainType(fromToken.blockchain);
    this.errorType[ERROR_TYPE.WRONG_WALLET] =
      Boolean(this.authService.userAddress) &&
      !Web3Pure[chainType].isAddressCorrect(this.authService.userAddress);
  }

  /**
   * Checks that user's token's balance is enough for trade.
   * Can start error loading process, if balance is not yet calculated.
   */
  private checkUserBalance(): void {
    const { fromToken, fromAmount } = this.swapFormService.inputValue;

    const fromChainType =
      fromToken?.blockchain && BlockchainsInfo.getChainType(fromToken.blockchain);
    if (
      !fromToken ||
      !this.authService.userAddress ||
      fromChainType !== this.authService.userChainType
    ) {
      this.errorType[ERROR_TYPE.INSUFFICIENT_FUNDS] = false;
      return;
    }

    if (fromToken.amount?.isFinite()) {
      this._errorLoading$.next(false);
      this.errorType[ERROR_TYPE.INSUFFICIENT_FUNDS] = fromToken.amount.lt(fromAmount);
    } else {
      this._errorLoading$.next(true);
    }
  }

  private checkSelectedToken(): void {
    this.errorType[ERROR_TYPE.NO_SELECTED_TOKEN] =
      isNil(this.swapFormService.inputValue?.fromToken) &&
      isNil(this.queryParamsService.currentQueryParams?.from);
  }

  /**
   * Checks that user's selected blockchain is equal to from blockchain.
   */
  private checkUserBlockchain(): void {
    const { fromToken } = this.swapFormService.inputValue;
    const userBlockchain = this.walletConnectorService.network;
    if (userBlockchain && fromToken) {
      this.errorType[ERROR_TYPE.WRONG_BLOCKCHAIN] = fromToken.blockchain !== userBlockchain;
      this.errorType[ERROR_TYPE.WRONG_SOURCE_NETWORK] = !fromBlockchains.includes(
        fromToken.blockchain
      );
    } else {
      this.errorType[ERROR_TYPE.WRONG_BLOCKCHAIN] = false;
    }
  }

  /**
   * Checks currently set errors and update errors subject.
   */
  public updateError(): void {
    this.translateSub$?.unsubscribe();

    let type: ERROR_TYPE | null = null;
    let translateParams: { key: string; interpolateParams?: object };
    const err = this.errorType;
    const { fromBlockchain } = this.swapFormService.inputValue;

    switch (true) {
      case err[ERROR_TYPE.WRONG_SOURCE_NETWORK]: {
        type = ERROR_TYPE.WRONG_SOURCE_NETWORK;
        translateParams = {
          key: 'errors.wrongSourceNetwork',
          interpolateParams: {
            network: blockchainLabel[fromBlockchain]
          }
        };
        break;
      }
      // @TODO Solana. Remove after blockchain stabilization.
      case err[ERROR_TYPE.SOLANA_UNAVAILABLE]: {
        type = ERROR_TYPE.SOLANA_UNAVAILABLE;
        if (this.iframeService.iframeAppearance === 'horizontal') {
          translateParams = {
            key: 'Unavailable'
          };
        } else {
          translateParams = {
            key: 'Solana is temporarily unavailable for Multi-Chain swaps.'
          };
        }
        break;
      }
      case err[ERROR_TYPE.WRONG_WALLET]: {
        type = ERROR_TYPE.WRONG_WALLET;
        translateParams = {
          key: 'errors.wrongWallet',
          interpolateParams: {
            network: blockchainLabel[fromBlockchain]
          }
        };
        break;
      }
      case err[ERROR_TYPE.MULTICHAIN_WALLET]: {
        type = ERROR_TYPE.MULTICHAIN_WALLET;
        translateParams = { key: 'errors.multichainWallet' };
        break;
      }
      case err[ERROR_TYPE.NO_SELECTED_TOKEN]: {
        type = ERROR_TYPE.NO_SELECTED_TOKEN;
        translateParams = { key: 'errors.noSelectedToken' };
        break;
      }
      case err[ERROR_TYPE.WRONG_BLOCKCHAIN]: {
        type = ERROR_TYPE.WRONG_BLOCKCHAIN;
        translateParams = {
          key: 'errors.chooseNetworkWallet',
          interpolateParams: { blockchain: fromBlockchain }
        };
        break;
      }
      case err[ERROR_TYPE.NO_AMOUNT]: {
        type = ERROR_TYPE.NO_AMOUNT;
        translateParams = { key: 'errors.noEnteredAmount' };
        break;
      }
      case err[ERROR_TYPE.LESS_THAN_MINIMUM]: {
        type = ERROR_TYPE.LESS_THAN_MINIMUM;
        translateParams = {
          key: 'errors.minimumAmount',
          interpolateParams: { amount: this.minAmount, token: this.minAmountTokenSymbol }
        };
        break;
      }
      case err[ERROR_TYPE.MORE_THAN_MAXIMUM]: {
        type = ERROR_TYPE.MORE_THAN_MAXIMUM;
        translateParams = {
          key: 'errors.maximumAmount',
          interpolateParams: { amount: this.maxAmount, token: this.maxAmountTokenSymbol }
        };
        break;
      }
      case err[ERROR_TYPE.INSUFFICIENT_FUNDS]: {
        type = ERROR_TYPE.INSUFFICIENT_FUNDS;
        translateParams = { key: 'errors.InsufficientBalance' };
        break;
      }
      case err[ERROR_TYPE.INVALID_TARGET_ADDRESS]: {
        type = ERROR_TYPE.INVALID_TARGET_ADDRESS;
        translateParams = { key: 'errors.invalidTargetAddress' };
        break;
      }
      case err[ERROR_TYPE.SOL_SWAP]: {
        type = ERROR_TYPE.SOL_SWAP;
        translateParams = { key: 'errors.solSwap' };
        break;
      }
      default:
    }

    const hasErrors = Object.values(err).filter(Boolean).length;
    if (hasErrors && !translateParams) {
      translateParams = { key: 'errors.unknown' };
    }
    if (!hasErrors && !translateParams) {
      this.ngZone.run(() => {
        this._errorBody$.next({
          type: null,
          text: ''
        });
      });
    } else {
      this.translateSub$ = this.translateService
        .stream(translateParams.key, translateParams.interpolateParams)
        .subscribe((text: string) => {
          this.ngZone.run(() => {
            this._errorBody$.next({
              type,
              text
            });
          });
        });
    }
  }

  public setMinAmountError(
    value: false | number | BigNumber | { amount: BigNumber; symbol: string }
  ): void {
    if (value) {
      const minAmount = typeof value === 'object' && 'amount' in value ? value.amount : value;
      if (typeof minAmount === 'number') {
        this.minAmount = minAmount.toString();
      } else {
        this.minAmount = this.withRoundPipe.transform(
          minAmount.toFormat(BIG_NUMBER_FORMAT),
          'toClosestValue'
        );
      }

      this.minAmountTokenSymbol =
        typeof value === 'object' && 'symbol' in value
          ? value.symbol
          : this.swapFormService.inputValue.fromToken.symbol;

      this.errorType[ERROR_TYPE.LESS_THAN_MINIMUM] = true;
    } else {
      this.errorType[ERROR_TYPE.LESS_THAN_MINIMUM] = false;
    }
    this.updateError();
  }

  public setMaxAmountError(
    value: false | number | BigNumber | { amount: BigNumber; symbol: string }
  ): void {
    if (value) {
      const maxAmount = typeof value === 'object' && 'amount' in value ? value.amount : value;
      if (typeof maxAmount === 'number') {
        this.maxAmount = maxAmount.toString();
      } else {
        this.maxAmount = this.withRoundPipe.transform(
          maxAmount.toFormat(BIG_NUMBER_FORMAT),
          'toClosestValue',
          { roundingMode: BigNumber.ROUND_HALF_UP }
        );
      }

      this.maxAmountTokenSymbol =
        typeof value === 'object' && 'symbol' in value
          ? value.symbol
          : this.swapFormService.inputValue.fromToken.symbol;

      this.errorType[ERROR_TYPE.MORE_THAN_MAXIMUM] = true;
    } else {
      this.errorType[ERROR_TYPE.MORE_THAN_MAXIMUM] = false;
    }
    this.updateError();
  }

  public isError(errorType: ERROR_TYPE): boolean {
    return this.errorType[errorType];
  }
}
