
import { CHAIN_IDS } from 'utils/wagmi'
import SubmitToken from '../views/SubmitToken'


const SubmitTokenPage = () => {
    return (
        <SubmitToken />
    )
}

SubmitTokenPage.chains = CHAIN_IDS

export default SubmitTokenPage
