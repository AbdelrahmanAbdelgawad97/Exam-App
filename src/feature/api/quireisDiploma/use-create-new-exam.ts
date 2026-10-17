import { useMutation, useQueries } from "@tanstack/react-query";
import { createNewExam } from "../diploma.api";
import type { addExamType } from "../../admin/exams/AdminCreateNewExam";
import { toast } from "#components/ui/toast";

export function useCreateNewExam() {
    return useMutation({
    
        mutationFn: (data:addExamType) => createNewExam(data),
        
        onSuccess: () => {
            toast.add({
                title: "Exam Created Successfully!",
                description: "Your exam has been added to the diploma successfully.",
            })
        }
    }
        
    )
}