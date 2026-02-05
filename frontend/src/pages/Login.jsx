
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { SpinnerButton } from "@/components/SpinnerButton";

const Login = () => {

    const { user, isLoading } = useContext(AuthContext);

    if ( isLoading ) {
        return <div><SpinnerButton/></div>
    }

    if ( !user ) {
       return (
            <div>
                <button
                    onClick={() => {
                                window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
                            }}
                >Login with Spotify</button>
            </div>
        ) 
    }

     return <Navigate to='/dashboard' />;  

}

export default Login