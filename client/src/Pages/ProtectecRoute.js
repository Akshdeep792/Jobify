import { useAppContext } from "../context/appContext"
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const {user} = useAppContext();
    if(!user){
        <Navigate to='/landing' />
    }
    return children
}

export default ProtectedRoutes