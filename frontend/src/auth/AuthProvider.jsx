
import axios from "axios";
import { createContext } from "react";
import { useState, useEffect } from "react";
import apiClient from '../api/apiClient'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {

    const checkAuth = async () => {
        
        try {  
            
            const response = await apiClient.get('/auth/me');
            setUser(response.data)

        } catch (error) {
            console.log('AuthProvider Error : ', error);
            setUser(null);

        }finally {
            setIsLoading(false);
        }
    }

    checkAuth();
        
   }, []);

    const isAuthenticated = !!user; 

    return (
        <AuthContext.Provider value={
            {
                user, 
                isLoading, 
                isAuthenticated
            }
        }> 
            {children}
        </AuthContext.Provider>
    )
   
}

export default AuthProvider;
export { AuthContext };