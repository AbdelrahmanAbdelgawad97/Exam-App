import { useMutation } from "@tanstack/react-query";
import { adminUpdateQuestion } from "../diploma.api";
import { toast } from "#components/ui/toast";
import type { AddingAnswer } from "../../user/types/iAddingAnswersAdmin";

export function useUpdateQuestion() {
    return useMutation({
        mutationFn: ({id,value,}: {id: string , value: AddingAnswer}) =>
            adminUpdateQuestion(id, value),
            onSuccess:()=> {
                toast.add({
                    title: "Question Updated Successfully!",
                    description: "Your Question has been updated successfully and the changes are now saved.",
                })
            }
    });
}