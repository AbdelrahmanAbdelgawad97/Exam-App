import {  useMutation } from "@tanstack/react-query";
import { adminDeleteDiploma } from "../diploma.api";
import { toast } from "#components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export function useAdminDeleteDiploma() {
    const queryClient = useQueryClient();
    return (useMutation({
        mutationFn: (value:string) => adminDeleteDiploma(value),
        onSuccess: async()=>{
            await queryClient.invalidateQueries({
                queryKey: ["all-diplomas"],
            });
            toast.add({
                title: `Diploma Was Deleted!`,
            })
        }
    }))
}