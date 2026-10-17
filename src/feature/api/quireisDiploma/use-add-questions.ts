import { useMutation } from "@tanstack/react-query";
import { addQuestions } from "../diploma.api";
import type { AddingAnswer } from "../../user/types/iAddingAnswersAdmin";
import { toast } from "#components/ui/toast";


export default function useAddQuestions() {
    
    return useMutation({
        mutationFn: ({ id, values }: { id: string; values: AddingAnswer }) => addQuestions(id, values),
            onSuccess: () => {
                toast.add({
                    title: "Exam Question Added Successfully!",
                    description: "Your exam question has been added to the diploma successfully.",
            })
        }
    })

}