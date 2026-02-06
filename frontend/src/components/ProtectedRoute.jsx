
import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { SpinnerButton } from "./SpinnerButton";

const ProtectedRoute = ({ children }) => {

    const { user, isLoading } = useAuth();

    if ( isLoading ) {
        return <div>
            <SpinnerButton/>
        </div>
    }

    if ( !user ) {
        return <Navigate to='/login' />
    }

    return children;

}

export default ProtectedRoute;