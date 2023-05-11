import useSWR from "swr";
import { useMemo } from "react";
import { fetcher } from "./fetcher";

export const useGetSwapKLine = ({
    sellAddress,
    buyAddress,
    type,
}) => {
    const requestInit: RequestInit = useMemo(() => {
        const body = new FormData()
        body.append('sellAddress', sellAddress)
        body.append('buyAddress', buyAddress)
        body.append('type', ['hour', 'week', 'month', 'year'][type])
        return {
            method: 'POST',
            body,
        }
    }, [buyAddress, sellAddress, type])
    return useSWR(`${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/swapKline/getKLine`, (url) => fetcher(url, requestInit));
}

export const GetSwapKLine = ({
    sellAddress,
    buyAddress,
    type,
}) => {
    const body = new FormData()
    body.append('sellAddress', sellAddress)
    body.append('buyAddress', buyAddress)
    body.append('type', ['hour', 'week', 'month', 'year'][type])
    const requestInit: RequestInit = {
        method: 'POST',
        body,
    }
    return fetcher(`${process.env.NEXT_PUBLIC_MININGPOOL_BASE_URL}/api/swapKline/getKLine`, requestInit);
}