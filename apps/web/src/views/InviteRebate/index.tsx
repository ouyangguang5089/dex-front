import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Table,
    Th,
    Td,
    TabMenu,
    Tab,
    useModal,
    Modal,
    ModalProps,
    Row,
    useToast,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useGetUserInviteInfo } from 'api/invite'
import { useAccount } from 'wagmi'
import { useInvitationRebateContract } from 'config/constants/InvitationRebate'

const Banner = styled(Flex)`
    margin: 0 auto;
    background: #cef249;
`

const NewButton = styled(Button)`
    background: #21212f;
    border-radius: 20px;
    padding: 0;
    width: 120px;
    height: 36px;
`

const NewTabMenu = styled(TabMenu)`
    border: none;
    padding: 0;
    margin-top: 16px;
    margin-bottom: 8px;
`

const NewTab = styled(Tab)`
    border-radius: 30px;
    height: 36px;
    width: 110px;
    padding: 0;
    line-height: 36px;
    font-size: 14px;
    color: #21212f;
    font-weight: normal;
`

const NewTh = styled(Th)`
    color: #21212f;
    background-color: #f3f2f9;
    border: none;
`

const NewTd = styled(Td)`
    border: none;
    font-size: 12px;
    font-weight: normal;
`

const Page = styled(Box)`
    margin: 30px 0px;
    --colors-text: #21212f;
`

const EmptyList = () => {
    return (
        <Box marginX="auto" padding="40px 0 20px">
            <Image width={159} height={133} src="/images/invite-rebate/list-empty.png" alt="" unoptimized />
            <Text mt="18px" textAlign="center">
                暂无记录
            </Text>
        </Box>
    )
}

const InviteRebateList = () => {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <NewTh>用户地址</NewTh>
                        <NewTh>交易额</NewTh>
                    </tr>
                </thead>
                {/* <tbody>
                <tr>
                    <NewTd>0x86u8hdw8jhf0sk0s2jwns...8dh6</NewTd>
                    <NewTd>3298.09BMB</NewTd>
                </tr>
                <tr>
                    <NewTd>0x86u8hdw8jhf0sk0s2jwns...8dh6</NewTd>
                    <NewTd>3298.09BMB</NewTd>
                </tr>
                <tr>
                    <NewTd>0x86u8hdw8jhf0sk0s2jwns...8dh6</NewTd>
                    <NewTd>3298.09BMB</NewTd>
                </tr>
                <tr>
                    <NewTd>0x86u8hdw8jhf0sk0s2jwns...8dh6</NewTd>
                    <NewTd>3298.09BMB</NewTd>
                </tr>
                <tr>
                    <NewTd>0x86u8hdw8jhf0sk0s2jwns...8dh6</NewTd>
                    <NewTd>3298.09BMB</NewTd>
                </tr>
            </tbody> */}
            </Table>
            <EmptyList />
        </>
    )
}

const CommissionRebateList = () => {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <NewTh>提取交易哈希</NewTh>
                        <NewTh>提取时间</NewTh>
                        <NewTh>提取金额</NewTh>
                    </tr>
                </thead>
                {/* <tbody>
                    <tr>
                        <NewTd>0x860u8h1d...8dh6</NewTd>
                        <NewTd>2023.3.14 13:06:12</NewTd>
                        <NewTd>53.95BMB</NewTd>
                    </tr>
                    <tr>
                        <NewTd>0x860u8h1d...8dh6</NewTd>
                        <NewTd>2023.3.14 13:06:12</NewTd>
                        <NewTd>53.95BMB</NewTd>
                    </tr>
                    <tr>
                        <NewTd>0x860u8h1d...8dh6</NewTd>
                        <NewTd>2023.3.14 13:06:12</NewTd>
                        <NewTd>53.95BMB</NewTd>
                    </tr>
                </tbody> */}
            </Table>
            <EmptyList />
        </>
    )
}

const CommissionWithdrawalList = () => {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <NewTh>提取交易哈希</NewTh>
                        <NewTh>提取时间</NewTh>
                        <NewTh>提取金额</NewTh>
                    </tr>
                </thead>
                {/* <tbody>
                <tr>
                    <NewTd>0x86u8hdw8jhf0sk0s2jwns...8dh6</NewTd>
                    <NewTd>3298.09BMB</NewTd>
                    <NewTd>3298.09BMB</NewTd>
                </tr>
            </tbody> */}
            </Table>
            <EmptyList />
        </>
    )
}

const RulesModal: React.FC<React.PropsWithChildren<ModalProps>> = ({ onDismiss }) => {
    return (
        // @ts-ignore
        <Modal
            onDismiss={onDismiss}
            hideCloseButton
            position="relative"
            style={{ backgroundColor: 'transparent', border: 'none', width: '310px' }}
        >
            <Box
                background="linear-gradient(#CEF249, white);"
                borderRadius="16px"
                style={{ position: 'absolute', left: '24px', top: '22px', width: '272px', height: '160px' }}
            />
            <Heading fontSize="24px" color="#21212F" style={{ position: 'absolute', left: '46px', top: '66px' }}>
                邀请好友规则
            </Heading>
            <Image
                width={100}
                height={100}
                alt=""
                unoptimized
                src="/images/invite-rebate/modal-top.png"
                style={{ position: 'absolute', right: '40px', top: '0px' }}
            />
            <Box background="white" padding="96px 23px 23px" borderRadius="16px">
                <Text color="#21212F" fontSize="14px" style={{ zIndex: '10', position: 'relative' }}>
                    邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明。邀请好友规则详细说明，邀请好友规则详细说明，邀请好友规则详细说明。
                </Text>
                <Row justifyContent="center" mt="20px">
                    <Button
                        onClick={onDismiss}
                        width="200px"
                        height="36px"
                        style={{ backgroundColor: '#CEF249', padding: '0' }}
                    >
                        我知道了
                    </Button>
                </Row>
            </Box>
        </Modal>
    )
}
const defaultInviteInfo = {
    myCommission: 0,
    withdrawableCommission: 0,
    vipLevelName: 'V0',
    vipLevel: 0,
    invitedUsers: 0,
    invitedTradingUsers: 0,
    invitedUserTransactionAmount: 0,
    updateTime: '',
    timeType: 'UTC+8',
}
const VipInfo = (level: number) => {
    return {
        image: `/images/invite-rebate/vip-${level}.png`,
        text: `VIP${level}`,
    }
}
// TODO i18n
const InviteRebatePage = () => {
    const [index, setIndex] = useState(0)
    const handleClick = (newIndex) => setIndex(newIndex)
    const [onPresent] = useModal(<RulesModal title={null} />)
    const { data: inviteResult } = useGetUserInviteInfo()
    const inviteInfo: typeof defaultInviteInfo = useMemo(() => {
        if (inviteResult && inviteResult?.code === 200 && inviteResult?.data) {
            return {
                ...defaultInviteInfo,
                ...inviteResult.data,
            }
        }
        return defaultInviteInfo
    }, [inviteResult])
    const { address } = useAccount()
    const contract = useInvitationRebateContract()
    const { toastSuccess, toastError } = useToast()
    const [isSubLoading, setSubLoading] = useState(false)
    const omWithdrawal = async () => {
        setSubLoading(true)
        try {
            await contract.withdraw()
            toastSuccess('提取成功')
        } catch (error) {
            toastError('提取失败')
        }
        setSubLoading(false)
    }
    return (
        <Page>
            {/*  */}
            <Banner width={['100%', '375px']} justifyContent="space-between" marginY="12px" padding="16px">
                <Box padding="35px 20px 18px">
                    <Heading fontSize="24px">邀请好友加入SWAP</Heading>
                    <Text marginTop="9px">赢取BMB奖励</Text>
                    <NewButton marginTop="25px" onClick={onPresent}>
                        <span style={{ marginRight: '5px' }}>查看规则</span>
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 5L0.25 9.33013L0.25 0.669872L7 5Z" fill="white" />
                        </svg>
                    </NewButton>
                </Box>
                <Flex alignItems="center">
                    <Image width={105} height={146} alt="" unoptimized src="/images/invite-rebate/banner.png" />
                </Flex>
            </Banner>
            {/*  */}
            <Flex
                width={['100%', '335px']}
                marginX="auto"
                height="100%"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Heading fontSize="18px" marginTop="30px">
                    我的邀请数据
                </Heading>
                {/*  */}
                <Flex
                    borderRadius="20px"
                    mt="12px"
                    background="#CEF249"
                    style={{ width: '100%' }}
                    padding="16px 20px"
                    flexDirection="column"
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            <Text>我的佣金（STP）</Text>
                            <Text fontSize="18px" fontWeight="500">
                                {inviteInfo.myCommission}
                            </Text>
                            <Text marginTop="16px">可提取佣金</Text>
                            <Text fontSize="18px" fontWeight="500">
                                {inviteInfo.withdrawableCommission}
                            </Text>
                        </Box>
                        <Flex flexDirection="column" alignItems="center">
                            <Image width={84} height={79} src="/images/invite-rebate/card-bg.png" alt="" unoptimized />
                            {address ? (
                                <NewButton
                                    disabled={inviteInfo.withdrawableCommission === 0}
                                    isLoading={isSubLoading}
                                    onClick={() => omWithdrawal()}
                                >
                                    提取
                                </NewButton>
                            ) : (
                                <NewButton disabled={!address}>请链接钱包</NewButton>
                            )}
                        </Flex>
                    </Flex>
                    <Box height="2px" width="100%" mt="10px" borderRadius="2px" backgroundColor="#21212F" />
                    <Box mt="24px">
                        <Flex mt="20px" justifyContent="space-between">
                            <Text>我的VIP等级</Text>
                            <Flex>
                                <Image
                                    width={28}
                                    height={28}
                                    src={VipInfo(inviteInfo.vipLevel).image}
                                    alt=""
                                    unoptimized
                                />
                                <Text>{VipInfo(inviteInfo.vipLevel).text}</Text>
                            </Flex>
                        </Flex>
                        <Flex mt="20px" justifyContent="space-between">
                            <Text>我邀请的用户数</Text>
                            <Text>{inviteInfo.invitedUsers}</Text>
                        </Flex>
                        <Flex mt="20px" justifyContent="space-between">
                            <Text>我邀请的交易用户数</Text>
                            <Text>{inviteInfo.invitedTradingUsers}</Text>
                        </Flex>
                        <Flex mt="20px" justifyContent="space-between">
                            <Text>邀请用户交易额</Text>
                            <Text>{inviteInfo.invitedUserTransactionAmount}</Text>
                        </Flex>
                    </Box>
                </Flex>
                {/*  */}
                <Text mt="16px" fontSize="12px">
                    数据更新于： {inviteInfo.updateTime}（{inviteInfo.timeType}）
                </Text>
                <Text mt="8px" fontSize="12px">
                    *佣金数据统计时间以OTC+8时间为准，每日0点左右为数据统计时间，邀请用户数和交易数据可实时更新
                </Text>
                <Heading fontSize="18px" marginTop="30px">
                    查看数据
                </Heading>
                <NewTabMenu activeIndex={index} onItemClick={handleClick}>
                    <NewTab style={{ backgroundColor: index === 0 ? '#CEF249' : 'transparent' }}>邀请用户</NewTab>
                    <NewTab style={{ backgroundColor: index === 1 ? '#CEF249' : 'transparent' }}>佣金和返现</NewTab>
                    <NewTab style={{ backgroundColor: index === 2 ? '#CEF249' : 'transparent' }}>佣金提取</NewTab>
                </NewTabMenu>
                {index === 0 && <InviteRebateList />}
                {index === 1 && <CommissionWithdrawalList />}
                {index === 2 && <CommissionRebateList />}
            </Flex>
        </Page>
    )
}

export default InviteRebatePage
