import { CHAIN_IDS } from 'utils/wagmi'
import MiningPool from '../views/MiningPool'


const MiningPoolPage = () => {
    return (
        <MiningPool />
    )
}

MiningPoolPage.chains = CHAIN_IDS

export default MiningPoolPage
