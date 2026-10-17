import { useMutation } from "@tanstack/react-query";
import { deleteSpecificLog } from "../logsAPI/logs.api";
import { toast } from "#components/ui/toast";

export function useDeleteOneLog() {
    return useMutation({
        mutationFn: (id: string)=>deleteSpecificLog(id),
        onSuccess: () => {
            toast.add({
                title: "One Log Was Deleted Successfully"
            })
        }
    })
}