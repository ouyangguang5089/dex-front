import { useAccount, useNetwork } from 'wagmi'

export function useWeb3React() {
  const { chain } = useNetwork()
  const { address, connector, isConnected, isConnecting } = useAccount()

  return {
    chainId: chain?.id,
    account: isConnected ? address : null,
    isConnected,
    isConnecting,
    chain,
    connector,
  }
}
