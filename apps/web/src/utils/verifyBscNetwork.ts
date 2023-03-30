import { ChainId } from '@pancakeswap/sdk'

export const verifyBscNetwork = (chainId: number) => {
  return chainId === ChainId.BSC_TESTNET || chainId === ChainId.BSC_TESTNET
}
