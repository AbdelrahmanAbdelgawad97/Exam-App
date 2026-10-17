import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../auth.api";
import { toast } from "#components/ui/toast";
import { useNavigate } from "react-router";

export default function useCreateAccount() {

const navigation = useNavigate();

return (
    useMutation({
        mutationFn: createAccount,
        onSuccess: () => {
            toast.add({
                type: "success",
                title: "Account Created Successfully!",
                description: "Please login to continue to you account.",
            })
            navigation("/login");
        }
    })
)
}
