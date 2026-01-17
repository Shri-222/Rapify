
import React, { createContext } from "react";
import { useState, useEffect } from "react";
import apiClient from '../api/apiClient.js'

    type AuthContextType = {
        user: any | null;          // keep it any for now, you can tighten later
        isLoading: boolean;
        isAuthenticated: boolean;
        setUser: React.Dispatch<React.SetStateAction<any | null>>;
    };

const AuthProvider = ({ children } : { children : React.ReactNode }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {

    const checkAuth = async () => {
        
        try {  
            
            const response = await apiClient.get('/auth/me', );
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

    const value: AuthContextType = {
            user,
            isLoading,
            isAuthenticated: !!user,
            setUser,
        };

    return (
        <AuthContext.Provider value={ value } >
            {children}
        </AuthContext.Provider>
    )
   
}

export default AuthProvider;
export const AuthContext = createContext<AuthContextType | null>(null);
