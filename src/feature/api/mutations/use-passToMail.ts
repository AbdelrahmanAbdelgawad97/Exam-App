import { useMutation } from "@tanstack/react-query";
import { resendPassowrToEmail } from "../auth.api";
import type { ResendPassToMail } from "../../user/types/iSendPassToMail";

export default function useSendPassToMail() {
    return(
        useMutation({
            mutationFn: (val:ResendPassToMail) => resendPassowrToEmail(val)
        })
    )
}