import { useMutation } from "@tanstack/react-query";
import { clearAllLogs } from "../logsAPI/logs.api";
import { toast } from "#components/ui/toast";

export function useclearAllLogs() {
    return useMutation({
        mutationFn: ()=>clearAllLogs(),
        onSuccess: () => {
            toast.add({
                title: "All Logs Are Cleared!"
            })
        }
    })
}