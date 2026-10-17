import { type RouteObject } from "react-router"
import AuthLayout from "./feature/auth/component/layout/AuthLayout"
import {authRoutes} from "./feature/auth/routes/autho.route"
import { diplomaRoutes } from "./feature/diploma/routes/diploma.route"
import AuthGard from "./shared/components/AuthGard"

export const routes:RouteObject[] = [
  {
    path: "/",
    children: [
      {
        element: <AuthLayout />,
        children: authRoutes
      },
      {
        element: <AuthGard />,
        children: diplomaRoutes
      },
    ]
  },
  {
    path: "/dashboard",
    element: <div>Admin Dashboard</div>
  },
]

