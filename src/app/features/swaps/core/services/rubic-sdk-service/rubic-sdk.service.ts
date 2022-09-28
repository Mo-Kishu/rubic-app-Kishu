import { Injectable } from '@angular/core';
import SDK, {
  Configuration,
  CrossChainManager,
  CrossChainStatusManager,
  InstantTradesManager,
  TokensManager
} from 'rubic-sdk';
import { rubicSdkDefaultConfig } from '@features/swaps/core/services/rubic-sdk-service/constants/rubic-sdk-default-config';
import { BehaviorSubject } from 'rxjs';
import { CrossChainSymbiosisManager } from 'rubic-sdk/lib/features/cross-chain/cross-chain-symbiosis-manager';
import { SdkHttpClient } from '@features/swaps/core/services/rubic-sdk-service/utils/sdk-http-client';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RubicSdkService {
  private readonly _sdkLoading$ = new BehaviorSubject<boolean>(false);

  public readonly sdkLoading$ = this._sdkLoading$.asObservable();

  private _SDK: SDK | null;

  private get SDK(): SDK {
    if (!this._SDK) {
      throw new Error('Rubic SDK is not initiated.');
    }
    return this._SDK;
  }

  public get tokens(): TokensManager {
    return this.SDK.tokens;
  }

  public get symbiosis(): CrossChainSymbiosisManager {
    return this.SDK.crossChainSymbiosisManager;
  }

  public get instantTrade(): InstantTradesManager {
    return this.SDK.instantTrades;
  }

  public get crossChain(): CrossChainManager {
    return this.SDK.crossChain;
  }

  public get crossChainStatusManager(): CrossChainStatusManager {
    return this.SDK.crossChainStatusManager;
  }

  private set SDK(value: SDK) {
    this._SDK = value;
  }

  public readonly defaultConfig = {
    ...rubicSdkDefaultConfig,
    httpClient: new SdkHttpClient(this.angularHttpClient)
  };

  private currentConfig: Configuration;

  constructor(private readonly angularHttpClient: HttpClient) {
    this._SDK = null;
  }

  public async initSDK(providerAddress: string): Promise<void> {
    this.SDK = await SDK.createSDK({ ...this.defaultConfig, providerAddress });
    this.currentConfig = { ...this.defaultConfig, providerAddress };
  }

  public async patchConfig(config: Partial<Configuration>): Promise<void> {
    this._sdkLoading$.next(true);
    try {
      const newConfig = { ...this.currentConfig, ...config };
      await this.SDK.updateConfiguration(newConfig);
      this.currentConfig = newConfig;
    } catch {
      console.debug('Failed to reload SDK configuration.');
    }
    this._sdkLoading$.next(false);
  }
}
