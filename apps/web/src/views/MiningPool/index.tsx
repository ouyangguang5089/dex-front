import { Box, Flex, Heading, Text, Button, InputGroup, TabMenu, Input, Tab, Row, Card, CardBody } from '@pancakeswap/uikit'

import Search from '@pancakeswap/uikit/src/components/Svg/Icons/Search'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'


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

// TODO i18n
const MiningPoolPage = () => {
    const [index, setIndex] = useState(0);
    const handleClick = (newIndex) => setIndex(newIndex);
    return (
        <Page >
            <Flex width={['335px']} marginX="auto" height="100%" flexDirection="column" justifyContent="center" alignItems="flex-start" >
                <Heading>交易挖矿</Heading>
                <Banner justifyContent="space-between" marginY="12px" padding="16px">
                    <Box>
                        <Text marginTop="6px">当前池子总奖励</Text>
                        <Text fontWeight="400" marginTop="6px">1.766.119.05 BMB</Text>
                        <Text marginTop="16px">当前个人可提现奖励</Text>
                        <Text fontWeight="400" marginTop="6px">0.00 BMB</Text>
                    </Box>
                    <Flex flexDirection="column" alignItems="center">
                        <Image
                            width={84}
                            height={79}
                            src="/images/mining-pool/banner.png"
                            alt=""
                            unoptimized
                        />
                        <WithdrawalButton>
                            提取
                        </WithdrawalButton>
                    </Flex>
                </Banner>
                <Row marginTop="32px">
                    <NewTabMenu activeIndex={index} onItemClick={handleClick} gap="2">
                        <NewTab style={{ backgroundColor: index === 0 ? "#CEF249" : "transparent" }}>全部</NewTab>
                        <NewTab style={{ backgroundColor: index === 1 ? "#CEF249" : "transparent" }}>USDT</NewTab>
                        <NewTab style={{ backgroundColor: index === 2 ? "#CEF249" : "transparent" }}>BUSD</NewTab>
                        <NewTab style={{ backgroundColor: index === 3 ? "#CEF249" : "transparent" }}>BMB</NewTab>
                    </NewTabMenu>
                    <Box width="90px">
                        <InputGroup startIcon={<Search width="20px" />} scale="sm">
                            <Input type="text" value="" onChange={console.log} />
                        </InputGroup>
                    </Box>
                </Row>
                <NewCard style={{ width: "100%", marginTop: "16px" }}>
                    <CardBody>
                        <Row justifyContent="flex-start" alignItems="center">
                            <Box position="relative" width="45px" height="30px">
                                <NewCurrencyLogo style={{ left: "0px", zIndex: "2" }} address="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" size="25px" chainName="BSC" />
                                <NewCurrencyLogo style={{ right: "0px", top: "0px" }} address="0x55d398326f99059fF775485246999027B3197955" size="25px" chainName="BSC" />
                            </Box>
                            <Heading ml="10px" scale="md">BNB/USDT</Heading>
                        </Row>
                        <Row marginTop="16px" alignItems="center">
                            <dl style={{ width: "33%" }}>
                                <dt >
                                    <Text small color="#909097">当前总奖励</Text>
                                </dt>
                                <dd >
                                    <Text small>1.766.05 BMB</Text>
                                </dd>
                            </dl>
                            <dl style={{ width: "33%" }}>
                                <dt >
                                    <Text small color="#909097">交易总额</Text>
                                </dt>
                                <dd >
                                    <Text small>1.766.05 亿</Text>
                                </dd>
                            </dl>
                            <dl style={{ width: "33%" }}>
                                <dt >
                                    <Text small color="#909097">当前交易额</Text>
                                </dt>
                                <dd >
                                    <Text small>0.99亿</Text>
                                </dd>
                            </dl>
                        </Row>
                        <Row marginTop="16px" alignItems="center">
                            <dl style={{ width: "33%" }}>
                                <dt >
                                    <Text small color="#909097">个人交易额</Text>
                                </dt>
                                <dd >
                                    <Text small>0.00</Text>
                                </dd>
                            </dl>
                            <dl style={{ width: "33%" }}>
                                <dt >
                                    <Text small color="#909097">个人奖励</Text>
                                </dt>
                                <dd >
                                    <Text small color="#884FDB">0.00 BMB</Text>
                                </dd>
                            </dl>
                        </Row>
                    </CardBody>
                </NewCard>
            </Flex>
        </Page>
    )
}

export default MiningPoolPage