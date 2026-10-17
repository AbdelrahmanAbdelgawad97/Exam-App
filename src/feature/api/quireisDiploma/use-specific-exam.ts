import { useQuery } from "@tanstack/react-query";
import { getSpecificExam } from "../diploma.api";

export function useExamDetails(id: string | undefined) {
    return useQuery({
        queryKey: ["all-diploma-exams", id],
        queryFn: () => getSpecificExam(id),
        enabled: !!id,
    })
}




