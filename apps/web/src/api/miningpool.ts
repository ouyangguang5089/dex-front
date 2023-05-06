import useSWR from "swr";
import { fetcher } from "./fetcher";



export const useGetMiningCoin = () => {
    return useSWR("/api/miningpool/getTopCoin", fetcher);
}

export const useGetMiningList = () => {
    return useSWR("/api/miningpool/swap", fetcher);
}