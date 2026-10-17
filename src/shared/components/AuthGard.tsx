import useToken from "#hooks/use-token"
import { Navigate, Outlet } from "react-router";


export default function AuthGard({children}: {children?:React.ReactNode}) {

    const {getToken} = useToken();
    const token = getToken();

    if(!token) return <Navigate to="/login" />
    return <Outlet />
}
