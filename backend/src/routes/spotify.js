
import express from 'express'
import verifySession from '../middleware/auth.js';
import axios from 'axios';
import validateTimeRange from '../middleware/validateTimeRange.js';
import validatePagination from '../middleware/validatePagination.js';
import validateRecentlyPlayedCursor from '../middleware/validateRecentlyPlayedCursor.js';
import refreshTokenValidate from '../middleware/refreshToken.js';

const router = express.Router();
const SPOTIFY_BASE_API = process.env.SPOTIFY_BASE_API

router.get('/top-artists', verifySession, refreshTokenValidate, validatePagination, validateTimeRange, async ( req, res ) => {

    try {
        
        const response = await axios.get(
            `${SPOTIFY_BASE_API}/me/top/artists`,
            {
                headers : {
                    Authorization : `Bearer ${req.session.sessionData.access_token}`
                },

                params : {
                    time_range : req.time_range,
                    limit : req.pagination.limit,
                    offset : req.pagination.offset
                }
            }
        )

        return res.json(response.data);

    } catch (error) {
        console.error( error.response || error );
        return res.status(400).json(
            {
                error : "Failed to fetch user Top Artists"
            }
        )
    }
})


router.get('/top-tracks', verifySession, refreshTokenValidate, validatePagination, validateTimeRange, async ( req, res ) => {

    try {
        
        const response = await axios.get(
            `${SPOTIFY_BASE_API}/me/top/tracks`,
            {
                headers : {
                    Authorization : `Bearer ${req.session.sessionData.access_token}`
                },

                params : {
                    time_range : req.time_range,
                    limit : req.pagination.limit,
                    offset : req.pagination.offset
                }
            }
        )

        return res.json(response.data);

    } catch (error) {
        console.error( error.response || error );
        return res.status(400).json(
            {
                error : "Failed to fetch user Top Tracks"
            }
        )
    }
})

router.get('/tracks', verifySession, refreshTokenValidate, validatePagination, validateTimeRange, async ( req, res ) => {

    try {
        
        const response = await axios.get(
            `${SPOTIFY_BASE_API}/me/tracks`,
            {
                headers : {
                    Authorization : `Bearer ${req.session.sessionData.access_token}`
                },

                params : {
                    time_range : req.time_range,
                    limit : req.pagination.limit,
                    offset : req.pagination.offset
                }
            }
        )

        return res.json(response.data);

    } catch (error) {
        console.error( error.response || error );
        return res.status(400).json(
            {
                error : "Failed to fetch user Top Tracks"
            }
        )
    }
})

router.get('/recently-played', verifySession, refreshTokenValidate, validateRecentlyPlayedCursor, async ( req, res ) => {

        try {
            
            const response = await axios.get(
                `${SPOTIFY_BASE_API}/me/player/recently-played`,

                {
                    headers : {
                        Authorization : `Bearer ${req.session.sessionData.access_token}`
                    },

                    params : {
                        limit : req.limit,
                        ...req.cursor
                    }
                }

            )

            return res.json(response.data);

        } catch (error) {
            console.error( error.response || error );
            return res.status(400).json(
                {
                    error : "Failed to fetch user Recently Played Tracks"
                }
            )
        }
})

export default router;