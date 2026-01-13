
import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import { createSession, getSession } from '../utility/sessionStore.js';
import verifySession from '../middleware/auth.js';
import refreshTokenValidate from '../middleware/refreshToken.js';

import buildSpotifyAuthURL from '../utility/auth.js';

import User from '../model/user.js';

const SPOTIFY_BASE_API = process.env.SPOTIFY_BASE_API
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

 //login redirect to spotify accounts service

router.get('/login', (req, res) => {

    const queryParser = buildSpotifyAuthURL({ CLIENT_ID, REDIRECT_URI });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParser}`);
});

 // callback route to handle spotify response 

router.get('/callback', async (req, res) => {

    const code = req.query.code || null;

    try {
        
        const tokenUrl = 'https://accounts.spotify.com/api/token';

        const response = await axios.post(
            tokenUrl,
            querystring.stringify({
                grant_type : 'authorization_code',
                code : code,
                redirect_uri : REDIRECT_URI
            }),

            {
                headers : {
                    Authorization : 
                    'Basic ' + 
                    Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
            }
        );

        const { access_token, refresh_token } = response.data;
        const expires_at = Date.now() + response.data.expires_in * 1000;

        // Fetch user Profile to store additional info by user 
        
        const me = await axios.get(
            `${SPOTIFY_BASE_API}/me`,
            {
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )

        // console.log('me : ', me.data)

        const spotifyId = me.data?.id

        if ( !spotifyId ) {
            return res.status(400).send('Failed to retrieve Spotify User ID');
        }

        const sessionId = createSession({
            access_token,
            spotifyId,
            expires_at
        });

        res.cookie(
            'session_id',
            sessionId,
            {
                httpOnly : true,
                sameSite : 'lax',
                secure : false,
                path : '/'
            }
        )

        console.log('Session Id : ', sessionId)

        const user = await User.findOne({ userId : spotifyId });

        if ( !user ) {
            const newUser = new User({
                userId : spotifyId,
                userName : me.data?.display_name,
                refresh_token : refresh_token
            });

            await newUser.save();
            console.log('newUser : ', newUser)
        }
        else {
            if ( refresh_token !== undefined ) {
                user.refresh_token = refresh_token;
                await user.save();
            }
            
        }

        res.redirect(`http://localhost:5173/login-success`)

    } catch (error) {
        console.log('Callback Error : ', error);
        res.status(500).send('An error occurred during authentication');
    }
});


router.get('/session', (req, res) => {
    const sessionId = req.cookies?.session_id;

    if(!sessionId) { 
        return res.status(400).json({
            error : "Missing Session Id"
        })
    };

    const data = getSession(sessionId);

    if(!data) {
        return res.status(400).json({
            error : "Missing Session Id"
        })
    };

    return res.json({
        access_token: data.access_token,
        refresh_token: data.refresh_token
    })
});


router.get('/refresh', async ( req, res ) => {

    const refresh_token = req.query;

    if(!refresh_token) {
        return res.status(400).json({
            error : 'Missing Refresh Token'
        });
    }
    
    try {
        
        const tokenUrl = 'https://accounts.spotify.com/api/token';

        const response = await axios.post(
            tokenUrl,
            querystring.stringify({
                grant_type : 'refresh_token',
                refresh_token : refresh_token
            }),

           {
            headers : {
                Authorization : 
                'Basic ' + 
                Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
           }
        )

            const { access_token } = response.data;

            return res.json({
                access_token
            })
    } catch (err) {
        console.error("Refresh Error:", err);
        res.status(500).json({ error: "Failed to refresh token" });
    }
});

router.get('/me', verifySession, refreshTokenValidate,  async ( req, res ) => {
    
    console.log('access Token ', req.session.sessionData.access_token)

   try {

    const me = await axios.get(
        `${SPOTIFY_BASE_API}/me`,

        {
            headers : {
                Authorization : `Bearer ${req.session.sessionData.access_token}`
            }
        }
    );

    return res.json(me.data);
    
   } catch (error) {
    console.error( error.response || error );
    return res.status(401).json(
        {
            error : "Failed to fetch user Profile"
        }
    )
   }
})


export default router;