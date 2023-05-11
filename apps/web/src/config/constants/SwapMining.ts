import { Contract } from '@ethersproject/contracts';
import { useProvider, useSigner } from 'wagmi';
import SwapMiningAbi from '../abi/SwapMining-abi.json';

// TODO SwapMining
export const useSwapMiningContract = () => {
    const { data: singer } = useSigner();
    const provier = useProvider();
    return new Contract('0xaEBC9C4888C18975984A23a7B9df00C0Fa725076', SwapMiningAbi, singer || provier);
};