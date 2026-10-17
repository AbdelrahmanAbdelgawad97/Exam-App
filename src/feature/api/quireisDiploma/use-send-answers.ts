import { useMutation } from "@tanstack/react-query";
import { sendAllAnswers } from "../diploma.api";

export function useSendAllAnswers() {
  return useMutation({
    mutationFn: sendAllAnswers,
  });
}