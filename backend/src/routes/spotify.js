
import express from 'express'
import 'dotenv/config'
import verifySession from '../middleware/auth.js';
import axios from 'axios';

const router = express.Router();
const SPOTIFY_BASE_API = process.env.SPOTIFY_BASE_API

router.get('/top-artists', verifySession, async ( req, res ) => {

    try {
        
        const response = await axios.get(
            `${SPOTIFY_BASE_API}/me/top/artists`,
            {
                headers : {
                    Authorization : `Bearer ${req.sessionData.access_token}`
                }
            }
        )

        return res.json(response.data);

    } catch (error) {
        console.error( error.response || error );
        return res.status(401).json(
            {
                error : "Failed to fetch user Top Artists"
            }
        )
    }
})

router.get('/top-tracks', verifySession, async ( req, res ) => {

    try {
        
        const response = await axios.get(
            `${SPOTIFY_BASE_API}/me/top/tracks`,
            {
                headers : {
                    Authorization : `Bearer ${req.sessionData.access_token}`
                }
            }
        )

        return res.json(response.data);

    } catch (error) {
        console.error( error.response || error );
        return res.status(401).json(
            {
                error : "Failed to fetch user Top Tracks"
            }
        )
    }
})

export default router;