import { useMutation } from "@tanstack/react-query";
import { adminUpdateSpecificExam } from "../diploma.api";
import { toast } from "#components/ui/toast";
import type { ExamData } from "../../user/types/iExam";

export function useExamDiploma() {
    return useMutation({
        mutationFn: ({id,value,}: {id: string , value: ExamData}) =>
            adminUpdateSpecificExam(id, value),
            onSuccess:()=> {
                toast.add({
                    title: "Exam Updated Successfully!",
                    description: "Your Exam has been updated successfully and the changes are now saved.",
                })
            }
    });
}