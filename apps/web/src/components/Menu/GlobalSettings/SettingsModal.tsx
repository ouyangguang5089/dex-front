import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import {
  Flex,
  InjectedModalProps,
  Modal,
  Text,
  ThemeSwitcher,
} from '@pancakeswap/uikit'

import { useActiveChainId } from 'hooks/useActiveChainId'
import useTheme from 'hooks/useTheme'
import { useCallback } from 'react'



import styled from 'styled-components'
import GasSettings from './GasSettings'
import TransactionSettings from './TransactionSettings'
import { SettingsMode } from './types'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  height: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: 90vh;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
  }
`

export const withCustomOnDismiss =
  (Component) =>
    ({
      onDismiss,
      customOnDismiss,
      mode,
      ...props
    }: {
      onDismiss?: () => void
      customOnDismiss: () => void
      mode: SettingsMode
    }) => {
      const handleDismiss = useCallback(() => {
        onDismiss?.()
        if (customOnDismiss) {
          customOnDismiss()
        }
      }, [customOnDismiss, onDismiss])

      return <Component {...props} mode={mode} onDismiss={handleDismiss} />
    }

const SettingsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss, mode }) => {
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()
  const { isDark, setTheme } = useTheme()


  return (
    <Modal title={t('Settings')} style={{ minHeight: "none" }} headerBackground="gradientCardHeader" onDismiss={onDismiss}>
      <ScrollableContainer>
        {mode === SettingsMode.GLOBAL && (
          <>
            <Flex flexDirection="column">
              <Text bold textTransform="uppercase" fontSize="18px" color="secondary" mb="24px">
                {t('Global')}
              </Text>
              <Flex justifyContent="space-between" mb="24px">
                <Text>{t('Dark mode')}</Text>
                <ThemeSwitcher isDark={isDark} toggleTheme={() => setTheme(isDark ? 'light' : 'dark')} />
              </Flex>
              <GasSettings />
            </Flex>
          </>
        )}
        {mode === SettingsMode.SWAP_LIQUIDITY && (
          <>
            <Flex pt="3px" flexDirection="column">
              <Text bold textTransform="uppercase" fontSize="18px" color="secondary" mb="24px">
                {t('Swaps & Liquidity')}
              </Text>
              <Flex justifyContent="space-between" alignItems="center" mb="24px">
                {chainId === ChainId.BSC_TESTNET && <GasSettings />}
              </Flex>
              <TransactionSettings />
            </Flex>
          </>
        )}
      </ScrollableContainer>
    </Modal>
  )
}

export default SettingsModal
