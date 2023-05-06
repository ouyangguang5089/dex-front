import useSWR from "swr";
import { useMemo } from "react";
import { fetcher } from "./fetcher";

export const useUploadImage = ({
    file
}: { file?: File } = {}) => {
    const requestInit: RequestInit = useMemo(() => {
        const body = new FormData()
        body.append('file', file)
        return {
            method: 'POST',
            body,
        }
    }, [file])
    return useSWR(() => {
        return file ? `${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/sys/upladImage` : null;
    }, (url) => fetcher(url, requestInit));
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
    chain
}: { contractAddress?: string,coinName?:string, logo?: string, email?: string, officialWebsite?: string, chain?: string } = {}) => {
    const requestInit: RequestInit = useMemo(() => {
        const body = new FormData()
        body.append('contractAddress', contractAddress)
        body.append('coinName', coinName)
        body.append('logo', logo)
        body.append('email', email)
        body.append('officialWebsite', officialWebsite)
        body.append('chain', chain)
        return {
            method: 'GET',
            body,
        }
    }, [chain, coinName, contractAddress, email, logo, officialWebsite])
    return useSWR(() => {
        return contractAddress && coinName && logo && email && officialWebsite && chain ? `${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/swapCoin/addCoin` : null;
    }, (url) => fetcher(url, requestInit));
}