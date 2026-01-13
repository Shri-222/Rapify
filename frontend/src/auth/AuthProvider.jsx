
import { createContext } from "react";
import { useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user; 

    <AuthContext.Provider value={
        {
            user, 
            setUser, 
            isLoading, 
            setIsLoading,
            isAuthenticated
        }
    }> 
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;
export { AuthContext };