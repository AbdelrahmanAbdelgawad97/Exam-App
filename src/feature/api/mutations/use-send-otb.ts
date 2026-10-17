import { useMutation } from "@tanstack/react-query";
import { sendOtpApi } from "../auth.api";

export default function useSendOtb() {
  return (
    useMutation({
        mutationFn: sendOtpApi,
    })
  )
}



