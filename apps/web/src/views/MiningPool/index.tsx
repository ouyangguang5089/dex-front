import { Contract } from '@ethersproject/contracts'
import { Box, Flex, Heading, Text, Button, InputGroup, TabMenu, Input, Tab, Row, Card, CardBody, Loading, SearchIcon, useToast } from '@pancakeswap/uikit'


import { useGetMiningCoin, useGetMiningList } from 'api'
import { useSwapMiningContract } from 'config/constants/SwapMining'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { useAccount, useSigner } from 'wagmi'



const Banner = styled(Flex)`
    width: 335px;
    background: #CEF249;
    border-radius: 20px;
`

const WithdrawalButton = styled(Button)`
    background: #21212F;
    border-radius: 20px;
    width: 110px;
    height: 36px;
`

const NewTabMenu = styled(TabMenu)`
    border: none;
    padding: 0;
`

const NewTab = styled(Tab)`
    border-radius: 30px;
    width: 62px;
    height: 30px;
    padding: 0;
    line-height: 30px;
    font-size: 14px;
    color: #21212F;
    font-weight: normal;
`

const NewCard = styled(Card)`
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #ECECEE;
`
const NewCurrencyLogo = styled(CurrencyLogo) <{ style: object }>`
    position: absolute;
    top: 0px;
`

const Page = styled(Box)`
    margin: 30px 0px;
    --colors-text: #21212F;
`

const Empty = () => {
    return (
        <Box marginX="auto" padding="40px 0 20px">
            <Image
                width={159}
                height={133}
                src="/images/invite-rebate/list-empty.png"
                alt=""
                unoptimized
            />
            <Text mt="18px" textAlign="center">暂无记录</Text>
        </Box>
    )
}

const PairItem = ({
    pairSymbol,
    pairToken0,
    pairToken1,
    userRewardVo,
    totalRewards,
    totalTransactionAmount,
    currentTransactionVolume,
}) => {
    const smallCount = 2;
    const FormatNum = (num: any) => {
        return Number.isNaN(Number(num)) ? 0 : Number(num).toFixed(smallCount)
    }
    return (
        <NewCard style={{ width: "100%", marginTop: "16px" }}>
            <CardBody>
                <Row justifyContent="flex-start" alignItems="center">
                    <Box position="relative" width="45px" height="30px">
                        <NewCurrencyLogo style={{ left: "0px", zIndex: "2" }} address={pairToken0} size="25px" chainName="BSC" />
                        <NewCurrencyLogo style={{ right: "0px", top: "0px" }} address={pairToken1} size="25px" chainName="BSC" />
                    </Box>
                    <Heading ml="10px" scale="md">{pairSymbol}</Heading>
                </Row>
                <Row marginTop="16px" alignItems="center">
                    <dl style={{ width: "33%" }}>
                        <dt >
                            <Text small color="#909097">当前总奖励</Text>
                        </dt>
                        <dd >
                            <Text small>{FormatNum(totalRewards)} STP</Text>
                        </dd>
                    </dl>
                    <dl style={{ width: "33%" }}>
                        <dt >
                            <Text small color="#909097">交易总额</Text>
                        </dt>
                        <dd >
                            <Text small>{FormatNum(totalTransactionAmount)}</Text>
                        </dd>
                    </dl>
                    <dl style={{ width: "33%" }}>
                        <dt >
                            <Text small color="#909097">当前交易额</Text>
                        </dt>
                        <dd >
                            <Text small>{FormatNum(currentTransactionVolume)}</Text>
                        </dd>
                    </dl>
                </Row>
                <Row marginTop="16px" alignItems="center">
                    <dl style={{ width: "33%" }}>
                        <dt >
                            <Text small color="#909097">个人交易额</Text>
                        </dt>
                        <dd >
                            <Text small>{FormatNum(userRewardVo.personalRewards)}</Text>
                        </dd>
                    </dl>
                    <dl style={{ width: "33%" }}>
                        <dt >
                            <Text small color="#909097">个人奖励</Text>
                        </dt>
                        <dd >
                            <Text small color="#884FDB">{FormatNum(userRewardVo.personalTotalTransactionAmount)} STP</Text>
                        </dd>
                    </dl>
                </Row>
            </CardBody>
        </NewCard>
    )
}


// TODO i18n
const MiningPool = () => {
    const [index, setIndex] = useState(0);
    const handleClick = (newIndex) => setIndex(newIndex);
    const [totalRewards, setTotalRewards] = useState(0);
    const [userRewards, setUserRewards] = useState(0);
    const [search, setSearch] = useState('');
    const { data: coinResult } = useGetMiningCoin();
    const coinList = useMemo(() => {
        const tmp = ['全部'];
        if (coinResult?.code === 200 && coinResult?.data) {
            coinResult.data.forEach(item => {
                tmp.push(item.coinName)
            });
        }
        return tmp;
    }, [coinResult]);
    const { data: listResult, mutate, isLoading, isValidating } = useGetMiningList({
        coin: coinList[index] === '全部' ? '' : coinList[index]
    });
    const coinPairs = useMemo(() => {
        let tmp = [];
        if (listResult?.code === 200 && listResult?.data) {
            if (listResult?.data.pageTotalRewards) setTotalRewards(listResult?.data.pageTotalRewards)
            if (listResult?.data.pagePersonalTotalRewards) setUserRewards(listResult?.data.pagePersonalTotalRewards)
            tmp = listResult?.data?.miningpoolInfoList || [];
        }
        return tmp;
    }, [listResult])


    useEffect(() => {
        mutate()
    }, [index, mutate]);

    const { address } = useAccount();
    const contract = useSwapMiningContract();
    const { toastSuccess, toastError } = useToast();
    const [isSubLoading,setSubLoading] = useState(false);
    const omWithdrawal = async () => {
        setSubLoading(true);
        try {
            await contract.takerWithdraw();
            toastSuccess("提取成功")
        } catch (error) {
            toastError("提取失败")
        }
        setSubLoading(false);
    }
    return (
        <Page >
            <Flex width={['335px']} marginX="auto" height="100%" flexDirection="column" justifyContent="center" alignItems="flex-start" >
                <Heading>交易挖矿</Heading>
                <Banner justifyContent="space-between" marginY="12px" padding="16px">
                    <Box>
                        <Text marginTop="6px">当前池子总奖励</Text>
                        <Text fontWeight="400" marginTop="6px">{totalRewards} STP</Text>
                        <Text marginTop="16px">当前个人可提现奖励</Text>
                        <Text fontWeight="400" marginTop="6px">{userRewards} STP</Text>
                    </Box>
                    <Flex flexDirection="column" alignItems="center">
                        <Image
                            width={84}
                            height={79}
                            src="/images/mining-pool/banner.png"
                            alt=""
                            unoptimized
                        />
                        {
                            address ? <WithdrawalButton isLoading={isSubLoading} onClick={() => omWithdrawal()}>
                                提取
                            </WithdrawalButton> : <Button disabled scale="sm">请链接钱包</Button>
                        }
                    </Flex>
                </Banner>
                <Flex width="100%" marginTop="32px" justifyContent="space-between">
                    <NewTabMenu activeIndex={index} onItemClick={handleClick} gap="2">
                        {coinList.map((item, i) => (
                            <NewTab key={`cointable-${item}`} style={{ backgroundColor: index === i ? "#CEF249" : "transparent" }}>{item}</NewTab>
                        ))}
                    </NewTabMenu>
                    <Box width="90px">
                        <InputGroup startIcon={<SearchIcon width="20px" />} scale="sm">
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputGroup>
                    </Box>
                </Flex>
                <Flex width="100%" padding="10px 0" justifyContent="center">
                    {isLoading && isValidating ? <Loading /> : coinPairs.length === 0 && <Empty />}
                </Flex>
                {coinPairs.map(item => (
                    <PairItem {...item} key={`coinpairs-${item?.poolId}`} />
                ))}
            </Flex>
        </Page>
    )
}

export default MiningPool;