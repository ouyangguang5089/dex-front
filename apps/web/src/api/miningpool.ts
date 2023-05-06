import useSWR from "swr";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import { fetcher } from "./fetcher";


export const useGetMiningCoin = () => {
    return useSWR(`${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/miningpool/getTopCoin`, fetcher);
}

export const useGetMiningList = ({
    coin,
}: { coin: string }) => {
    let { address } = useAccount();
    address = process.env.NODE_ENV === 'development' ? '0x91FbD2fF5AE81fF912AD2E8E90e103274312198d' : address; // TODO 测试环境
    const requestInit: RequestInit = useMemo(() => ({
        headers: {
            token: address,
        },
        method: "POST",
    }), [address])
    return useSWR(() => {    
        return address ? `${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/miningpool/swap?address=${address}&coin=${coin}` : null;
    }, (url) => fetcher(url, requestInit));
}