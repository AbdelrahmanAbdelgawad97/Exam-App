import { useMutation } from "@tanstack/react-query";
import { adminUpdateDiploma } from "../diploma.api";
import type { addDiplomaType } from "../../admin/AdminAddNewDiploma";
import { toast } from "#components/ui/toast";

export function useUpdateDiploma() {
    return useMutation({
        mutationFn: ({id,value,}: {id: string , value: addDiplomaType}) =>
            adminUpdateDiploma(id, value),
            onSuccess:()=> {
                toast.add({
                    title: "Diploma Updated Successfully!",
                    description: "Your diploma has been updated successfully and the changes are now saved.",
                })
            }
    });
}