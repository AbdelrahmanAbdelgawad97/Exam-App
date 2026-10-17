import { useMutation } from '@tanstack/react-query'
import { confirmUpdatedEmailOtb } from '../auth.api'

export default function useUpdatedEmailConfirmCode() {
  return (
        useMutation({
            mutationFn: confirmUpdatedEmailOtb,
        })
  )
}
