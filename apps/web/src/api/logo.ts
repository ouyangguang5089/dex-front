import useSWR from "swr";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import useSWRMutation from 'swr/mutation';
import { fetcher } from "./fetcher";

export const useUploadImage = ({
    file,
}: { file?: File } = {}) => {
    const requestInit: RequestInit = useMemo(() => {
        const body = new FormData()
        body.append('file', file)
        return {
            method: 'POST',
            body,
        }
    }, [file])
    return useSWRMutation(`${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/sys/upladImage`, (uri) => fetcher(uri, requestInit));
}

export const useGetChainList = () => {
    return useSWR(`${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/swapCoin/getChainList`, fetcher);
}

export const useGetCoinInfo = ({
    contractAddress
}: { contractAddress?: string } = {}) => {
    const requestInit: RequestInit = useMemo(() => {
        const body = new FormData()
        body.append('contractAddress', contractAddress)
        return {
            method: 'GET',
            body,
        }
    }, [contractAddress])
    return useSWR(() => {
        return contractAddress ? `${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/swapCoin/getCoinInfo` : null;
    }, (url) => fetcher(url, requestInit));
}

export const useChangeCoin = ({
    contractAddress,
    coinName,
    logo,
    email,
    officialWebsite,
    chain,
}: { contractAddress?: string, coinName?: string, logo?: string, email?: string, officialWebsite?: string, chain?: string } = {}) => {
    const { address } = useAccount();
    const requestInit: RequestInit = useMemo(() => {
        const body = new FormData()
        body.append('chain', chain)
        body.append('coinName', coinName)
        body.append('contractAddress', contractAddress)
        body.append('logo', logo)
        body.append('email', email)
        body.append('officialWebsite', officialWebsite)
        body.append('submitAddress', address)
        return {
            method: 'POST',
            body,
        }
    }, [address, chain, coinName, contractAddress, email, logo, officialWebsite])
    return useSWRMutation(`${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/swapCoin/addCoin`, (url) => fetcher(url, requestInit));
}

