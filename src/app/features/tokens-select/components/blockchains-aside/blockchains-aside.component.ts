import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BLOCKCHAIN_NAME } from '@shared/models/blockchain/blockchain-name';
import { BlockchainsInfo } from 'src/app/core/services/blockchain/blockchain-info';
import { BLOCKCHAIN_LABEL } from '@features/tokens-select/constants/blockchains-labels';

@Component({
  selector: 'app-blockchains-aside',
  templateUrl: './blockchains-aside.component.html',
  styleUrls: ['./blockchains-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockchainsAsideComponent {
  @Input() blockchain: BLOCKCHAIN_NAME;

  @Input() allowedBlockchains: BLOCKCHAIN_NAME[] | undefined;

  @Input() idPrefix: string;

  @Output() blockchainChange = new EventEmitter<BLOCKCHAIN_NAME>();

  private readonly allBlockchains: BLOCKCHAIN_NAME[] = [
    BLOCKCHAIN_NAME.ETHEREUM,
    BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    BLOCKCHAIN_NAME.POLYGON,
    BLOCKCHAIN_NAME.NEAR,
    BLOCKCHAIN_NAME.AURORA,
    BLOCKCHAIN_NAME.AVALANCHE,
    BLOCKCHAIN_NAME.FANTOM,
    BLOCKCHAIN_NAME.MOONRIVER,
    BLOCKCHAIN_NAME.HARMONY,
    BLOCKCHAIN_NAME.SOLANA,
    BLOCKCHAIN_NAME.ARBITRUM,
    BLOCKCHAIN_NAME.XDAI
  ];

  public blockchainImages = Object.fromEntries(
    this.blockchains.map(blockchainName => [
      blockchainName,
      BlockchainsInfo.getBlockchainByName(blockchainName).imagePath
    ])
  );

  get blockchains(): BLOCKCHAIN_NAME[] {
    if (this.allowedBlockchains) {
      return this.allBlockchains.filter(el => this.allowedBlockchains.includes(el));
    }
    return this.allBlockchains;
  }

  constructor() {}

  public getBlockchainLabel(blockchainName: BLOCKCHAIN_NAME): string {
    return BLOCKCHAIN_LABEL[blockchainName];
  }

  public onBlockchainSelect(blockchainName: BLOCKCHAIN_NAME): void {
    this.blockchain = blockchainName;
    this.blockchainChange.emit(blockchainName);
  }
}
