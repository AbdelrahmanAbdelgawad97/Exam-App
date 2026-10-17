import { type RouteObject } from "react-router"
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResendPasswordInfo from "./pages/ResendPasswordInfo";
import CreateNewPassForForgotten from "./pages/CreateNewPassForForgotten";

export const authRoutes: RouteObject[] = [
    {
      path: "login",
      element: <LoginPage />
    },
    {
      path: "register",
      element: <RegisterPage />
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "forgotPasswordInfo",
      element: <ResendPasswordInfo />
    },
    {
      path: "createNewPassword",
      element: <CreateNewPassForForgotten />
    }
]