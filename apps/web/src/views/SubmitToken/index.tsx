import { Box, Flex, Heading, Text, Input, Row, AutoColumn, Select } from '@pancakeswap/uikit'
import { useMemo } from 'react'
import styled from "styled-components"
import { ChainId } from '@pancakeswap/sdk'
import UploadImage from './UploadImage'

const Page = styled(Box)`
    margin: 30px 0px;
    --colors-text: #21212F;
    --colors-input: #fff;
`



// TODO i18n
const SubmitToken = () => {

    const chainOptions = useMemo(() => {
        return [
            {
                label: "币安测试网",
                value: ChainId.BSC_TESTNET
            }
        ]
    }, []);
    return (
        <Page >
            <Flex width={['335px']} marginX="auto" height="100%" flexDirection="column" justifyContent="center" alignItems="flex-start" >
                <Heading>提交代币Logo</Heading>
                <Box marginTop="60px" width="100%">
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>项目网络</Text>
                            <Select width="100%" options={chainOptions} />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>代币符号</Text>
                            <Input type="text" scale="md" value="" placeholder="请输入代币符号" />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>合约地址</Text>
                            <Input type="text" scale="md" value="" placeholder="请输入合约地址" />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>Email</Text>
                            <Input type="text" scale="md" value="" placeholder="请输入Email" />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>官方地址</Text>
                            <Input type="text" scale="md" value="" placeholder="请输入官方网址" />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <UploadImage />
                    </Row>
                </Box>
            </Flex>
        </Page>)
}

export default SubmitToken;