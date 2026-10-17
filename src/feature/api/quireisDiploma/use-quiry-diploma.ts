import { useQuery } from "@tanstack/react-query";
import { getAllDiplomas, getAllDiplomasPages } from "../diploma.api";

export function useAllDiplomas (pageNum?: number) {
  return  useQuery({
    queryKey: ["all-diplomas", pageNum],
    queryFn: () => getAllDiplomas(pageNum),
    
  })
}

export function useAllDiplomasData () {
  return  useQuery({
    queryKey: ["all-diplomas-data"],
    queryFn: () => getAllDiplomasPages(),
    
  })
}
