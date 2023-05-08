import { Box, Flex, Heading, Text, Input, Row, AutoColumn, Select, Button, useToast } from '@pancakeswap/uikit'
import { useEffect, useMemo, useState } from 'react'
import styled from "styled-components"
import { useChangeCoin, useGetChainList, useUploadImage } from 'api/logo'
import { useAccount } from 'wagmi'
import UploadImage from './UploadImage'

const Page = styled(Box)`
    margin: 30px 0px;
    --colors-text: #21212F;
    --colors-input: #fff;
`

// TODO i18n
const SubmitToken = () => {
    const [data, setData] = useState({
        chain: '',
        coinName: '',
        contractAddress: '',
        logo: '',
        email: '',
        officialWebsite: '',
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState('请设置信息');
    const { address } = useAccount();

    const { data: chainResult } = useGetChainList();
    const chainOptions = useMemo(() => {
        const tmp = [];
        if (chainResult?.code === 200 && chainResult?.data) {
            chainResult.data.forEach(item => {
                tmp.push({
                    label: item.chain,
                    value: item.chainName
                })
            });
            if (chainResult?.data?.length > 0) {
                setData({
                    ...data,
                    "chain": chainResult.data[0].chainName,
                })
            }
        } else {
            tmp.push({
                label: "币安智能链",
                value: "bsc"
            })
        }
        return tmp;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainResult]);
    const onChange = (key, value) => {
        setData({
            ...data,
            [key]: value,
        })
    }
    const { mutate, isLoading: isUploading } = useUploadImage({ file: image, enable: !error })
    const { data: changeResult } = useChangeCoin(data)
    const { toastSuccess, toastError } = useToast();
    // eslint-disable-next-line consistent-return
    const onSubmit = async () => {
        let err = '';
        if (!address) err = '请链接钱包';
        else if (!data?.chain) err = '请输入正确的链';
        // eslint-disable-next-line no-useless-escape
        else if (!/[a-zA-Z0-9\-]{2,12}/.test(data?.coinName)) err = '请输入正确的代币符号';
        else if (!/[a-zA-Z0-9]{42}/.test(data?.contractAddress)) err = '请输入正确的合约地址';
        // eslint-disable-next-line no-useless-escape
        else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(data?.email)) err = '请输入正确的邮件地址';
        // eslint-disable-next-line no-useless-escape
        else if (!/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(data?.officialWebsite)) err = '请输入正确的官方网址';
        else if (!image) err = '请上传logo';
        setError(err);
        if (err) {
            return toastError(err);
        }
        // 上传图片-
        if (image) {
            await mutate().catch(() => {
                toastError("上传图片失败，请重试！");
            }).then(res => {
                if (res?.code === 200 && res?.data?.filePath) {
                    setData({
                        ...data,
                        logo: res.data.filePath
                    })
                } else {
                    toastError("上传图片失败，请重试！");
                }
            });
        }
    }

    useEffect(() => {
        if (changeResult && changeResult?.code) {
            if (changeResult?.code === 200) {
                toastSuccess('提交成功');
            } else {
                toastError('提交失败');
            }

        }
    }, [changeResult, toastError, toastSuccess])

    return (
        <Page >
            <Flex width={['335px']} marginX="auto" height="100%" flexDirection="column" justifyContent="center" alignItems="flex-start" >
                <Heading>提交代币Logo</Heading>
                <Box margin="30px 0" width="100%">
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>项目网络</Text>
                            <Select width="100%" options={chainOptions} onOptionChange={(option) => onChange('chain', option.value)} />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>代币符号</Text>
                            <Input type="text" scale="md" placeholder="请输入代币符号" onChange={(e) => onChange('coinName', e?.currentTarget?.value)} />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>合约地址</Text>
                            <Input type="text" scale="md" placeholder="请输入合约地址" onChange={(e) => onChange('contractAddress', e?.currentTarget?.value)} />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>Email</Text>
                            <Input type="text" scale="md" placeholder="请输入Email" onChange={(e) => onChange('email', e?.currentTarget?.value)} />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <AutoColumn gap="8px" width="100%" >
                            <Text>官方地址</Text>
                            <Input type="text" scale="md" placeholder="请输入官方网址" onChange={(e) => onChange('officialWebsite', e?.currentTarget?.value)} />
                        </AutoColumn>
                    </Row>
                    <Row marginBottom="12px" width="100%" >
                        <UploadImage onChanged={(file) => {
                            setImage(file);
                        }} />
                    </Row>
                </Box>
                <Row width="100%">
                    <Button width="100%" disabled={!address} isLoading={isUploading} onClick={() => onSubmit()}>
                        {
                            address ? '提交' : '请链接钱包'
                        }
                    </Button>
                </Row>
            </Flex>
        </Page>)
}

export default SubmitToken;