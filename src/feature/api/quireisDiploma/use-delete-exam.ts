import {  useMutation } from "@tanstack/react-query";
import {  adminDeleteExam } from "../diploma.api";
import { toast } from "#components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export function useAdminDeleteExam() {
    const queryClient = useQueryClient();
    return (useMutation({
        mutationFn: (value:string) => adminDeleteExam(value),
        onSuccess: async()=>{
            await queryClient.invalidateQueries({
                queryKey: ["all-diplomas"],
            });
            toast.add({
                title: `Exam Was Deleted!`,
            })
        }
    }))
}