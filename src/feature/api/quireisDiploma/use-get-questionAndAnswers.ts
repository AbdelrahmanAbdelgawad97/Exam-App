import { useQuery } from "@tanstack/react-query";
import { getOneQuestion} from "../diploma.api";

export function useGetQuestionAndAnswers(id: string| undefined) {
    return useQuery({
        queryKey: ["exam-get-questions",id],
        queryFn: ()=>getOneQuestion(id!),
        enabled: !!id,
    })
}