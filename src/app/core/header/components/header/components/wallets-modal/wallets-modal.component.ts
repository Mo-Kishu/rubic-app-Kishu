import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProviderConnectorService } from 'src/app/core/services/blockchain/provider-connector/provider-connector.service';
import { MessageBoxComponent } from 'src/app/shared/components/message-box/message-box.component';
import { NetworkError } from 'src/app/shared/models/errors/provider/NetworkError';
import { RubicError } from 'src/app/shared/models/errors/RubicError';

export interface WalletProvider {
  name: string;
  value: WALLET_NAME;
  img: string;
}

export enum WALLET_NAME {
  METAMASK = 'metamask',
  WALLET_LINK = 'walletlink'
}

@Component({
  selector: 'app-wallets-modal',
  templateUrl: './wallets-modal.component.html',
  styleUrls: ['./wallets-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletsModalComponent {
  @ViewChild('modal') modal: TemplateRef<any>;

  private matModal: MatDialogRef<any>;

  public readonly providers: WalletProvider[];

  constructor(
    private dialog: MatDialog,
    private readonly providerConnectorService: ProviderConnectorService
  ) {
    this.providers = [
      {
        name: 'MetaMask',
        value: WALLET_NAME.METAMASK,
        img: './assets/images/icons/wallets/metamask.svg'
      },
      {
        name: 'Coinbase wallet',
        value: WALLET_NAME.WALLET_LINK,
        img: './assets/images/icons/wallets/coinbase.png'
      }
    ];
  }

  public async connectProvider(provider: WALLET_NAME) {
    await this.providerConnectorService.connectProvider(provider);
    await this.providerConnectorService.activate();
    this.close();
  }

  public close(): void {
    this.dialog.closeAll();
  }
}
