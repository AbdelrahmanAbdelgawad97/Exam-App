import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../auth.api";

export default function useUserInfo() {
  return  useQuery({
    queryKey: ["user-profile"],
    queryFn: getCurrentUserProfile,
  })
}