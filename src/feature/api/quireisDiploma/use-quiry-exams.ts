import { useQuery } from "@tanstack/react-query";
import {  getAllDiplomasAllExams, getAllDiplomasTopics } from "../diploma.api";

export function useAllDiplomaExams(id: string | undefined) {
  return  useQuery({
    queryKey: ["all-diploma-exams", id],
    queryFn: () => getAllDiplomasTopics(id),
    enabled: !!id,
  })
}

export function useAllDiplomaTest(id: string | undefined) {
  return  useQuery({
    queryKey: ["all-diploma-exams", id],
    queryFn: () => getAllDiplomasAllExams(id),
    enabled: !!id,
  })
}