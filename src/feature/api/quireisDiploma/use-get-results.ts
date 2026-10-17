import { useQuery } from "@tanstack/react-query";
import { getAllSubmitions } from "../diploma.api";

export function useQueryGetAnswers(id: string| undefined) {
    return useQuery({
        queryKey: ["exam-results",id],
        queryFn: ()=>getAllSubmitions(id!),
        enabled: !!id,
    })
}