import { Contract } from '@ethersproject/contracts';
import { useProvider, useSigner } from 'wagmi';
import SwapMiningAbi from '../abi/SwapMining-abi.json';


export const useSwapMiningContract = () => {
    const { data: singer } = useSigner();
    const provier = useProvider();
    return new Contract('0x5bAa23eeC54e8B65de37706a7793A4d7cA287756', SwapMiningAbi, singer || provier);
};