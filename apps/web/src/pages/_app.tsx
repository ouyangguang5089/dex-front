import '@pancakeswap/ui/css/reset.css'
import { ResetCSS, ScrollToTopButtonV2, ToastListener } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import GlobalCheckClaimStatus from 'components/GlobalCheckClaimStatus'
import { NetworkModal } from 'components/NetworkModal'
import { FixedSubgraphHealthIndicator } from 'components/SubgraphHealthIndicator/FixedSubgraphHealthIndicator'
import TransactionsDetailModal from 'components/TransactionDetailModal'
import { useAccountEventListener } from 'hooks/useAccountEventListener'
import useEagerConnect from 'hooks/useEagerConnect'
import useLockedEndNotification from 'hooks/useLockedEndNotification'
import useThemeCookie from 'hooks/useThemeCookie'
import useUserAgent from 'hooks/useUserAgent'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import Head from 'next/head'

import { DefaultSeo } from 'next-seo'
import { PageMeta } from 'components/Layout/Page'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, useStore } from 'state'
import { usePollBlockNumber } from 'state/block/hooks'
import { Blocklist, Updaters } from '..'
import { SEO } from '../../next-seo.config'
import Menu from '../components/Menu'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'



// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function GlobalHooks() {
  usePollBlockNumber()
  useEagerConnect()
  useUserAgent()
  useAccountEventListener()
  useThemeCookie()
  useLockedEndNotification()
  return null
}

function MyApp(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps } = props
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="SmartSwap"
        />
        <meta name="theme-color" content="#1FC7D4" />
      </Head>
      <DefaultSeo {...SEO} />
      <Providers store={store}>
        <PageMeta />
        <Blocklist>
          <GlobalHooks />
          <ResetCSS />
          <GlobalStyle />
          <GlobalCheckClaimStatus excludeLocations={[]} />
          <PersistGate loading={null} persistor={persistor}>
            <Updaters />
            <App {...props} />
          </PersistGate>
        </Blocklist>
      </Providers>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>
  /** render component without all layouts */
  pure?: true
  /**
   * allow chain per page, empty array bypass chain block modal
   * @default [ChainId.BSC_TESTNET]
   * */
  chains?: number[]
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}



const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.pure) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <Menu>
        <Component {...pageProps} />
      </Menu>
      <ToastListener />
      <FixedSubgraphHealthIndicator />
      <NetworkModal pageSupportedChains={Component.chains} />
      <TransactionsDetailModal />
      <ScrollToTopButtonV2 />
    </>
  )
}

export default MyApp
