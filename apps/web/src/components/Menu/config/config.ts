import {
  MenuItemsType,
  SwapIcon,
  SwapFillIcon,
  MiningPoolIcon,
  MiningPoolFillIcon,
  InviteRebateIcon,
  InviteRebateFillIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
    [
      {
        label: t('Trade'),
        icon: SwapIcon,
        fillIcon: SwapFillIcon,
        href: '/',
        showItemsOnMobile: false,
        items: [
          {
            label: t('Swap'),
            href: '/',
          },
          {
            label: t('Liquidity'),
            href: '/liquidity',
          },
        ].map((item) => addMenuItemSupported(item, chainId)),
      },
      {
        label: t("Mining Pool"),
        href: '/mining-pool',
        icon: MiningPoolIcon,
        fillIcon: MiningPoolFillIcon,
        image: '/images/decorations/pe2.png',
        showItemsOnMobile: false,
        items: [
          {
            label: t("Mining Pool"),
            href: '/mining-pool',
          },
        ].map((item) => addMenuItemSupported(item, chainId)),
      },
      {
        label: t("Invite Rebate"),
        href: '/invite-rebate',
        icon: InviteRebateIcon,
        fillIcon: InviteRebateFillIcon,
        image: '/images/decorations/pe2.png',
        showItemsOnMobile: false,
        items: [
          {
            label: t("Invite Rebate"),
            href: '/invite-rebate',
          },
        ].map((item) => addMenuItemSupported(item, chainId)),
      },
      {
        label: t('Submit Token'),
        href: '', // TODO 外链
        icon: MiningPoolIcon,
        fillIcon: MiningPoolFillIcon,
        image: '/images/decorations/pe2.png',
        showItemsOnMobile: true,
        items: []
      },
    ].map((item) => addMenuItemSupported(item, chainId))

export default config
