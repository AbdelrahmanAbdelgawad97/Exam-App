import { useQuery } from "@tanstack/react-query";
import { getAllSpecificExam } from "../diploma.api";

export function useQueryQuestions(id: string | undefined) {
    return useQuery({
        queryKey: ["all-diploma-exams-questions", id],
        queryFn: () => getAllSpecificExam(id),
        enabled: !!id,
    })
}

export function useQueryDiplomaDetails(id: string | undefined) {
    return useQuery({
        queryKey: ["all-diploma-exams", id],
        queryFn: () => getAllSpecificExam(id),
        enabled: !!id,
    })
}