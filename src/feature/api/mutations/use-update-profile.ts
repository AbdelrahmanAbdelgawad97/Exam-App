import {  useMutation , useQueryClient} from "@tanstack/react-query";
import { setUpdatedProfile } from "../auth.api";
import { toast } from "#components/ui/toast";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setUpdatedProfile,

    onSuccess: (data) => {
      // console.log("hook=======>",data)
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      }
      );

      toast.add({
        type:"success",
        title: "Data Updated Successfully",
      })
    }
    
  });
}