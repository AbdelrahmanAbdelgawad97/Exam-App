import { useQuery } from "@tanstack/react-query";
import { getDiplomaDetails } from "../diploma.api";

export function useDiplomaSpecificData(id: string | undefined) {
    return useQuery({
        queryKey: ["all-diploma-exams", id],
        queryFn: () => getDiplomaDetails(id),
        enabled: !!id,
    })
}