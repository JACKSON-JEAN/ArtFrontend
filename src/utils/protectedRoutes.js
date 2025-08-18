import { Navigate, Outlet, useLocation } from "react-router-dom"
import { getUserRole } from "./decodeToken"

function ProtectedRoutes({allowedRoles}) {
    const accessToken = localStorage.getItem('accessToken')
    const userRole = getUserRole()
    const location = useLocation()

    if(!accessToken){
        return <Navigate to="/" state={{ from: location}} replace />
    }

    if(allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorised" state={{from: location}} replace />
    }

    return <Outlet />
}

export default ProtectedRoutes;