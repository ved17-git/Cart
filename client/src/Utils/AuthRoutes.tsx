import { Navigate, Outlet } from "react-router-dom"
function AuthRoutes() {
 
const token=localStorage.getItem('token')

return token ? <Navigate to='/'/>  : <Outlet/>

}

export default AuthRoutes