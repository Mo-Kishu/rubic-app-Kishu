import { BLOCKCHAIN_NAME, EvmBlockchainName, TronBlockchainName, TronWebProvider } from 'rubic-sdk';

export const rpcList: Record<EvmBlockchainName, string[]> &
  Record<TronBlockchainName, TronWebProvider[]> = {
  [BLOCKCHAIN_NAME.ETHEREUM]: [
    'https://rpc.ankr.com/eth/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d',
    'https://eth.getblock.io/mainnet/?api_key=02530958-c8c4-4297-974c-66203e79800d'
  ],
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
    'https://rpc.ankr.com/bsc/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d',
    'https://bsc.getblock.io/mainnet/?api_key=02530958-c8c4-4297-974c-66203e79800d'
  ],
  [BLOCKCHAIN_NAME.POLYGON]: [
    'https://rpc.ankr.com/polygon/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d',
    'https://matic.getblock.io/mainnet/?api_key=02530958-c8c4-4297-974c-66203e79800d'
  ],
  [BLOCKCHAIN_NAME.HARMONY]: ['https://api.harmony.one', 'https://api.s0.t.hmny.io/'],
  [BLOCKCHAIN_NAME.AVALANCHE]: [
    'https://rpc.ankr.com/avalanche/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d',
    'https://avax.getblock.io/mainnet/ext/bc/C/rpc?api_key=02530958-c8c4-4297-974c-66203e79800d',
    'https://speedy-nodes-nyc.moralis.io/7625ae299d1e13d495412740/avalanche/mainnet'
  ],
  [BLOCKCHAIN_NAME.MOONRIVER]: [
    'https://moonriver-api.bwarelabs.com/e72ceb4c-1e99-4e9f-8f3c-83f0152ad69f',
    'https://rpc.moonriver.moonbeam.network'
  ],
  [BLOCKCHAIN_NAME.FANTOM]: [
    'https://rpc.ankr.com/fantom/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d',
    'https://speedy-nodes-nyc.moralis.io/106bebf40377b2e543f51299/fantom/mainnet'
  ],
  [BLOCKCHAIN_NAME.ARBITRUM]: [
    'https://late-white-sky.arbitrum-mainnet.quiknode.pro/84da6c33a092bf64d9d72bc52c5db62aac00c81c/',
    'https://arb1.arbitrum.io/rpc'
  ],
  [BLOCKCHAIN_NAME.AURORA]: ['https://mainnet.aurora.dev'],
  [BLOCKCHAIN_NAME.TELOS]: ['https://rpc1.eu.telos.net/evm', 'https://mainnet.telos.net/evm'],
  [BLOCKCHAIN_NAME.OPTIMISM]: [
    'https://rpc.ankr.com/optimism/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d'
  ],
  [BLOCKCHAIN_NAME.CRONOS]: ['https://evm-cronos.crypto.org'],
  [BLOCKCHAIN_NAME.OKE_X_CHAIN]: ['https://exchainrpc.okex.org'],
  [BLOCKCHAIN_NAME.GNOSIS]: [
    'https://rpc.ankr.com/gnosis/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d'
  ],
  [BLOCKCHAIN_NAME.FUSE]: ['https://fuse-rpc.gateway.pokt.network/'],
  [BLOCKCHAIN_NAME.MOONBEAM]: [
    'https://rpc.ankr.com/moonbeam/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d'
  ],
  [BLOCKCHAIN_NAME.CELO]: [
    'https://rpc.ankr.com/celo/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d'
  ],
  [BLOCKCHAIN_NAME.BOBA]: ['https://mainnet.boba.network'],
  [BLOCKCHAIN_NAME.ASTAR]: ['https://rpc.astar.network:8545'],
  [BLOCKCHAIN_NAME.ETHEREUM_POW]: ['https://mainnet.ethereumpow.org/'],
  [BLOCKCHAIN_NAME.KAVA]: ['https://evm.kava.io'],
  [BLOCKCHAIN_NAME.TRON]: [
    {
      fullHost:
        'https://rpc.ankr.com/premium-http/tron/a8bbc9d3f69cf00657231179b7006f784b86dd0eb67aec90116347d32c10867d'
    }
  ],
  /*
  [BLOCKCHAIN_NAME.SOLANA]: [
    'https://green-hidden-shape.solana-mainnet.quiknode.pro/',
    'https://sol.getblock.io/mainnet/?api_key=02530958-c8c4-4297-974c-66203e79800d'
  ],
  [BLOCKCHAIN_NAME.NEAR]: ['https://rpc.testnet.near.org']
   */
  [BLOCKCHAIN_NAME.BITGERT]: [
    'https://serverrpc.com',
    'https://dedicated.brisescan.com/',
    'https://rpc-bitgert-vefi.com',
    'https://rpc.icecreamswap.com',
    'https://mainnet-rpc.brisescan.com',
    'https://chainrpc.com'
  ]
};
