
import React, { createContext } from "react";
import { useState, useEffect } from "react";
import apiClient from '../api/apiClient.js'
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [artists, setArtists] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {

    const checkAuth = async () => {
        
        try {  
            
            const me = await apiClient.get('/auth/me');
            setUser(me.data);

        } catch (error) {
            console.log('AuthProvider Error : ', error);
            setUser(null);

        }finally {
            setIsLoading(false);
        }
    }

    checkAuth();
        
   }, []);

    useEffect(() => {
        const getTracksAndArtiste = async() => {
            try {

                const artistes = await apiClient.get('/spotify/top-artists')
                setArtists(artistes);
                
                const tracks = await apiClient.get('/spotify/top-tracks');
                setTracks(tracks)
                
            } catch (error) {
                console.log('AuthProvider Error : ', error);
                setArtists(null);
                setTracks(null);
            }
        }

        getTracksAndArtiste();
    }, []);

    const value = {
            user,
            artists,
            tracks,
            isLoading,
            isAuthenticated: !!user,
            setUser,
    }
    
        // console.log('artist : ', artists)
        // console.log('Tracks : ', tracks)

    // console.log('user : ', user)

    return (
        <AuthContext.Provider value={ value } >
            {children}
        </AuthContext.Provider>
    )
   
}

export default AuthProvider;

