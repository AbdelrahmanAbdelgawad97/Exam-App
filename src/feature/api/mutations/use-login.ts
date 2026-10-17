import { useNavigate } from "react-router";
import type { LoginFormValue } from "../../auth/types/login";
import { loginApi } from "../auth.api";
import { useMutation } from '@tanstack/react-query'
import useToken from "#hooks/use-token";


export function useLogin() {

    const navigate = useNavigate();
    const {setToken} = useToken();

    return useMutation({
        mutationFn: (value: LoginFormValue) => loginApi(value),
        onSuccess: (response) => {
            setToken(response.payload.token)
            navigate('/');
        }
    })
}



