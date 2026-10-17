import { useMutation } from "@tanstack/react-query";
import { deleteOwnAccount } from "../auth.api";
import { toast } from "#components/ui/toast";

export default function useDeleteTheUserAccount () {
  return useMutation({
    mutationFn: deleteOwnAccount,
    onSuccess: () => {
        toast.add({
            type: "success",
            title: "Account Was Deleted!",
            description: "You can no longer use this account again",
        })
    }
  });
}