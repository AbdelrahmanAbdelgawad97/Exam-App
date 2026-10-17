import { useMutation } from "@tanstack/react-query";
import { userChangePassword } from "../auth.api";
import { toast } from "#components/ui/toast";


export default function useChangePassword() {
return (
    useMutation({
        mutationFn: userChangePassword,
        onSuccess: (success) => {
            toast.add({
            type: "success",
            title: `${success}`,
            })
        },

        onError: (error) => {
            toast.add({
                type: "success",
                title: `${error}`,
            })
        },
    })
)
}
