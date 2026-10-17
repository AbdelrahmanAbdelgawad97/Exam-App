
import { useQuery } from "@tanstack/react-query";
import { getSpecificLog } from "../logsAPI/logs.api";

export function useGetSpecificLog(id: string| undefined) {
    return useQuery({
        queryKey: ["logs-all",id],
        queryFn: ()=>getSpecificLog(id!),
        enabled: !!id,
    })
}