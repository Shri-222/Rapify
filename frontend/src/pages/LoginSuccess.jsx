
import { Navigate } from "react-router-dom";

const LoginSuccess = () => {
  return (
    <div>
        <h2>LoginSuccess</h2>
        <Navigate to='/dashboard' />
    </div>
    
  )
}

export default LoginSuccess