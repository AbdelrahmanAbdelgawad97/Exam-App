import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../diploma.api";

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImage,
  });
}