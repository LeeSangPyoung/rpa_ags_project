import { Navigate, Outlet } from "react-router-dom"
import { CHANGE_PASSWORD_ROUTE, LOGIN_ROUTE } from "../constants/constants"
import { useAuthStore } from "../stores"

type PrivateRouteProps = {
    allowedRoles: string[],
}
export const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const userRoles = useAuthStore((state) => state.roles)
    const mustChangePw = useAuthStore((state) => state.mustChangePw)

    const hasAccess = userRoles.some((role) => allowedRoles.includes(role)) && !mustChangePw;
    return hasAccess ? <Outlet /> : (mustChangePw ? <Navigate to={CHANGE_PASSWORD_ROUTE} replace/> : <Navigate to={LOGIN_ROUTE} replace/>)

}

