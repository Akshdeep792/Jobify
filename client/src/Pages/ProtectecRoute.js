import { useAppContext} from "../context/appContext"
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    let navigate = useNavigate();
    const {user} = useAppContext();
    if(!user){
        navigate('/landing')
    }
    return children
}

export default ProtectedRoutes