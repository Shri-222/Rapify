
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

const Login = () => {

    const { user, isLoading } = useContext(AuthContext);

    if ( isLoading ) {
        return <div>Loading...</div>
    }

    if ( !user ) {
       return (
            <div>
                <button
                    onClick={
                        window.location.href = 'http://localhost:8000/auth/login' 
                    }
                >Login with Spotify</button>
            </div>
        ) 
    }

     return <Navigate to='/dashboard' />;  

}

export default Login