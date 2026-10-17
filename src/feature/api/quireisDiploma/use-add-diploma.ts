import { useMutation } from '@tanstack/react-query'
import { addNewDiploma } from '../diploma.api'
import { toast } from "#components/ui/toast";

export default function useAddDiploma() {
return (
    useMutation({
        mutationFn: addNewDiploma,
        onSuccess: () => toast.add({
            type: "success",
            title: "Diploma Added Successfully!",
            description: "Check Your All Diplomas",
        })
    })
)
}
