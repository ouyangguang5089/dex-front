import { Flex, Heading } from "@pancakeswap/uikit"
import Page from "views/Page"

// TODO i18n
const SubmitTokenPage = () => {
    return (
        <Page >
            <Flex width={['335px']} marginX="auto" height="100%" flexDirection="column" justifyContent="center" alignItems="flex-start" >
                <Heading>提交代币</Heading>
            </Flex>
        </Page>
    )
}

export default SubmitTokenPage