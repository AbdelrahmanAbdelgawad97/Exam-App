import {  useMutation } from "@tanstack/react-query";
import { adminDeleteQuestion } from "../diploma.api";
import { toast } from "#components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export function useAdminDeleteQuestion() {
    const queryClient = useQueryClient();
    return (useMutation({
        mutationFn: (value:string) => adminDeleteQuestion(value),
        onSuccess: async()=>{
            await queryClient.invalidateQueries({
                queryKey: ["exam-get-questions"],
            });
            toast.add({
                title: `Question Was Deleted!`,
            })
        }
    }))
}