import { BlockchainName, BLOCKCHAIN_NAME } from '@app/shared/models/blockchain/blockchain-name';

export const CELER_TRANSIT_TOKENS: Partial<Record<BlockchainName, string[]>> = {
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: ['0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'],
  [BLOCKCHAIN_NAME.POLYGON]: ['0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
  [BLOCKCHAIN_NAME.AVALANCHE]: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664'],
  [BLOCKCHAIN_NAME.FANTOM]: ['0x04068da6c83afcfa0e13ba15a6696662335d5b75'],
  [BLOCKCHAIN_NAME.ETHEREUM]: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48']
};