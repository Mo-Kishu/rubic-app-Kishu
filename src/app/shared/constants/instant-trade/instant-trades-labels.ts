import { INSTANT_TRADES_PROVIDERS } from '@shared//models/instant-trade/instant-trade-providers';

export const instantTradesLabels: Record<INSTANT_TRADES_PROVIDERS, string> = {
  [INSTANT_TRADES_PROVIDERS.ONEINCH]: '1inch',
  [INSTANT_TRADES_PROVIDERS.UNISWAP_V2]: 'Uniswap V2',
  [INSTANT_TRADES_PROVIDERS.UNISWAP_V3]: 'Uniswap V3',
  [INSTANT_TRADES_PROVIDERS.PANCAKESWAP]: 'Pancakeswap',
  [INSTANT_TRADES_PROVIDERS.QUICKSWAP]: 'Quickswap',
  [INSTANT_TRADES_PROVIDERS.SUSHISWAP]: 'Sushiswap',
  [INSTANT_TRADES_PROVIDERS.ZRX]: '0x',
  [INSTANT_TRADES_PROVIDERS.PANGOLIN]: 'Pangolin',
  [INSTANT_TRADES_PROVIDERS.JOE]: 'Joe',
  [INSTANT_TRADES_PROVIDERS.SOLARBEAM]: 'Solarbeam',
  [INSTANT_TRADES_PROVIDERS.SPOOKYSWAP]: 'Spookyswap',
  [INSTANT_TRADES_PROVIDERS.SPIRITSWAP]: 'Spiritswap',
  [INSTANT_TRADES_PROVIDERS.WRAPPED]: 'Wrapped',
  [INSTANT_TRADES_PROVIDERS.RAYDIUM]: 'Raydium',
  [INSTANT_TRADES_PROVIDERS.ALGEBRA]: 'Algebra',
  [INSTANT_TRADES_PROVIDERS.VIPER]: 'Viperswap',
  [INSTANT_TRADES_PROVIDERS.TRISOLARIS]: 'Trisolaris',
  [INSTANT_TRADES_PROVIDERS.WANNASWAP]: 'Wannaswap',
  [INSTANT_TRADES_PROVIDERS.REF]: 'Ref finance',
  [INSTANT_TRADES_PROVIDERS.ZAPPY]: 'Zappy'
};
