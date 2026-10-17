import { useMutation } from '@tanstack/react-query'
import { sendUpdatedEmailOtb } from '../auth.api'

export default function useUpdatedEmailCode() {
  return (
        useMutation({
            mutationFn: sendUpdatedEmailOtb,
        })
  )
}
