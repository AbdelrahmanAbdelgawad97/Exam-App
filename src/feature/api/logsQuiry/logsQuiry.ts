import { useQuery } from "@tanstack/react-query";
import { getLogsAudit } from "../logsAPI/logs.api";

export function useGellAllLogs(id?: number| undefined) {
    return useQuery({
        queryKey: ["logs-all",id],
        queryFn: ()=>getLogsAudit(id!),
        enabled: !!id,
    })
}