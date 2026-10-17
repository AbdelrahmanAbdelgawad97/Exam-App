import { useQueryClient } from "@tanstack/react-query"

export default function useDeleteQueries() {
  const queryClient = useQueryClient()

  const deleteQueries = () => {
    queryClient.clear()
  }

  return deleteQueries
}