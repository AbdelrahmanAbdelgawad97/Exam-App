import { useQuery } from "@tanstack/react-query";
import { getLogsusers } from "../logsAPI/logs.api";

export function useGellAllLogsUsers(id?: number| undefined) {
    return useQuery({
        queryKey: ["logs-all",id],
        queryFn: ()=>getLogsusers(id!),
        enabled: !!id,
    })
}