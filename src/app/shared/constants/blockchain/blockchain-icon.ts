import { BLOCKCHAIN_NAME, BlockchainName } from 'rubic-sdk';

const basePath = 'assets/images/icons/coins/';

export const blockchainIcon: Record<BlockchainName, string> = {
  [BLOCKCHAIN_NAME.ETHEREUM]: `${basePath}eth-contrast.svg`,
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: `${basePath}bnb.svg`,
  [BLOCKCHAIN_NAME.POLYGON]: `${basePath}polygon.svg`,
  [BLOCKCHAIN_NAME.HARMONY]: `${basePath}harmony.svg`,
  [BLOCKCHAIN_NAME.AVALANCHE]: `${basePath}avalanche.svg`,
  [BLOCKCHAIN_NAME.MOONRIVER]: `${basePath}moonriver.webp`,
  [BLOCKCHAIN_NAME.FANTOM]: `${basePath}fantom.svg`,
  [BLOCKCHAIN_NAME.ARBITRUM]: `${basePath}arbitrum.svg`,
  [BLOCKCHAIN_NAME.AURORA]: `${basePath}aurora.svg`,
  [BLOCKCHAIN_NAME.TELOS]: `${basePath}telos.svg`,
  [BLOCKCHAIN_NAME.OPTIMISM]: `${basePath}optimism.png`,
  [BLOCKCHAIN_NAME.CRONOS]: `${basePath}cronos.png`,
  [BLOCKCHAIN_NAME.OKE_X_CHAIN]: `${basePath}okexchain.png`,
  [BLOCKCHAIN_NAME.GNOSIS]: `${basePath}gnosis.png`,
  [BLOCKCHAIN_NAME.FUSE]: `${basePath}fuse.png`,
  [BLOCKCHAIN_NAME.MOONBEAM]: `${basePath}moonbeam.png`,
  [BLOCKCHAIN_NAME.CELO]: `${basePath}celo.png`,
  [BLOCKCHAIN_NAME.BOBA]: `${basePath}boba.svg`,
  [BLOCKCHAIN_NAME.ASTAR]: `${basePath}astar.svg`,
  [BLOCKCHAIN_NAME.ETHEREUM_POW]: `${basePath}eth-pow.png`,
  [BLOCKCHAIN_NAME.KAVA]: `${basePath}kava.png`,
  [BLOCKCHAIN_NAME.TRON]: `${basePath}tron.png`,
  [BLOCKCHAIN_NAME.BITCOIN]: `${basePath}bitcoin.svg`,
  [BLOCKCHAIN_NAME.SOLANA]: `${basePath}solana.svg`,
  [BLOCKCHAIN_NAME.NEAR]: `${basePath}near.svg`,
  [BLOCKCHAIN_NAME.BITGERT]: `${basePath}bitgert.png`
};
