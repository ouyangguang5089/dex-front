import { useMemo } from 'react'
import { useAccount } from 'wagmi'

export const useMenuItemsStatus = (): Record<string, string> => {
  const { address } = useAccount();
  return useMemo(() => {
    return {
      ...(address && {
        '/miningo-pool': 'lock_end',
      }),
    }
  }, [address])
}
