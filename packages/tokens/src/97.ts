import { ChainId, ERC20Token, WBNB } from '@pancakeswap/sdk'
import { BUSD_TESTNET, CAKE_TESTNET } from './common'

export const bscTestnetTokens = {
  wbnb: WBNB[ChainId.BSC_TESTNET],
  bake: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x95119E5f6EB49dd384FE20A3c49aA809347643B4', // TODO BAKE
    // '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
  ),
  stp: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x63B99558c599415BCba1f438464AA9ED771489Bf', // TODO STP
    18,
    'STP',
    'STP Token',
  ),
  busd: BUSD_TESTNET,
  // syrup: new ERC20Token(
  //   ChainId.BSC_TESTNET,
  //   '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
  //   18,
  //   'SYRUP',
  //   'SyrupBar Token',
  //   'https://pancakeswap.finance/',
  // ),

  eth: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x5986800b56DcB7BCc2B8f0209F38F4F98e9a4F07', // TODO ETH
    18,
    'ETH',
    'Binance ETH',
  ),
  btcb: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xe2bFE03401613fED48bbA18cb388Ce3479521eC4', // TODO BTCB
    18,
    'BTCB',
    'Binance BTCB',
  ),
  band: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x246430297070DE1AC66A77C4EA326690171C3dFC', // TODO BAND
    18,
    'BAND',
    'Binance BAND',
  ),
  eos: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xEC7998cb671Cf7573b9D75C480Eb6b8E365CeB92', // TODO EOS
    18,
    'EOS',
    'Binance EOS',
  ),
  // hbtc: new ERC20Token(ChainId.BSC_TESTNET, '0x3Fb6a6C06c7486BD194BB99a078B89B9ECaF4c82', 18, 'HBTC', 'Huobi BTC'),
  // wbtc: new ERC20Token(ChainId.BSC_TESTNET, '0xfC8bFbe9644e1BC836b8821660593e7de711e564', 8, 'WBTC', 'Wrapped BTC'),
  usdc: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D',
    18,
    'USDC',
    'Binance-Peg USD Coin',
  ),
  usdt: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x060a5563455E76d1C207Ac1deB3ABc984C757aE4', // TODO USDT
    // '0x0fB5D7c73FA349A90392f873a4FA1eCf6a3d0a96'
    18,
    'USDT',
    'Tether USD',
  ),
  xrp: new ERC20Token(ChainId.BSC_TESTNET,
    '0x145cF690120f04f96F50843186479363Fce347cB', // TODO XRP
    18,
    'XRP',
    'Binance XRP'
  ),
  bch: new ERC20Token(ChainId.BSC_TESTNET,
    '0xBe111E024D71be29d6C3905F6fFDd0764Add75dC', // TODO BCH
    18,
    'BCH',
    'Binance BCH'
  ),
  // mockBusd: new ERC20Token(
  //   ChainId.BSC_TESTNET,
  //   '0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7',
  //   18,
  //   'BUSD',
  //   'Binance USD',
  // ),
  cake: CAKE_TESTNET,
  dai: new ERC20Token(ChainId.BSC_TESTNET,
    '0x90cA2E05D9AE2C3B4B8489dE4cd52A8907B56BAc', // TODO DAI
    18,
    'DAI',
    'Binance DAI'
  ),
  ust: new ERC20Token(ChainId.BSC_TESTNET,
    '0xBdB50D067dA16De3694dA7534A9D8c3925f27c99', // TODO UST
    18,
    'UST',
    'Binance UST'
  ),
}
