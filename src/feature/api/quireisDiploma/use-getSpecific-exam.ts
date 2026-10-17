import { useQuery } from "@tanstack/react-query";
import { getSpecificDiplomaDetails } from "../diploma.api";

export function useQueryGetAnswers(id: string| undefined) {
    return useQuery({
        queryKey: ["exam-results-exam",id],
        queryFn: ()=>getSpecificDiplomaDetails(id!),
        enabled: !!id,
    })
}