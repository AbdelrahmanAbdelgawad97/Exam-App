import { useQuery } from "@tanstack/react-query";
import { getSpecificQuestions } from "../diploma.api";

export function useGetQuestions(id: string| undefined) {
    return useQuery({
        queryKey: ["exam-get-questions",id],
        queryFn: ()=>getSpecificQuestions(id!),
        enabled: !!id,
    })
}