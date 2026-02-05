
import React, { createContext } from "react";
import { useState, useEffect } from "react";
import apiClient from '../api/apiClient.js'

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
        if (!user) return;

        const getTracksAndArtiste = async () => {
            try {
            const artistes = await apiClient.get('/spotify/top-artists');
            setArtists(artistes.data);

            const tracks = await apiClient.get('/spotify/top-tracks');
            setTracks(tracks.data);
            } catch (error) {
            console.log('Tracks Error:', error);
            }
        };

        getTracksAndArtiste();
    }, [user]);

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

