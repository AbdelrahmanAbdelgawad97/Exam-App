import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../auth.api";
import type { ModifiedPasswordData } from "../../user/types/iModifyForgotenPass";
import { toast } from "#components/ui/toast";
import { useNavigate } from "react-router";

export function useResetPassword() {
    const navigation = useNavigate();
    return (
        useMutation({
            mutationFn: (values:ModifiedPasswordData) => resetPassword(values),
            onSuccess: () => {
            toast.add({
                type: "success",
                title: "Password has been reset successfully!",
                description: "Please login with your new password?",
            })
            navigation("/login");
        }
        })
        
    )
}