import { useAccount } from "wagmi";
import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useGetUserInviteInfo = () => {
    let { address } = useAccount();
    address = process.env.NODE_ENV === 'development' ? '0x91FbD2fF5AE81fF912AD2E8E90e103274312198d' : address; // TODO 测试环境
    const requestInit: RequestInit = useMemo(() => {
        const body = new FormData();
        body.append('address', address);
        return {
            method: 'POST',
            body,
        }
    }, [address])
    return useSWR(() => {
        return address ? `${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/invite/getUserInviteInfo` : null;
    }, (url) => fetcher(url, requestInit));
}