
import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import { createSession, getSession } from '../sessionStore.js';

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

    console.log("Redirect Url : ", REDIRECT_URI)
    console.log("Client ID : ", CLIENT_ID)
    console.log("Client secret  : ", CLIENT_SECRET)

 //login redirect to spotify accounts service

router.get('/login', (req, res) => {
    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-read-recently-played'
    ].join(' ');

    const queryParser = querystring.stringify({
        response_type : 'code',
        client_id : CLIENT_ID,
        scope : scope,
        redirect_uri : REDIRECT_URI,
        show_dialog : true
    });

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

        console.log("Tokens : ", access_token, refresh_token);

        res
            .cookie('access_token',access_token, { httpOnly : true})
            .cookie('refresh_token', refresh_token, { httpOnly : true})

        const sessionId = createSession({
            access_token,
            refresh_token
        });

        console.log('Session Id : ', sessionId)

        res.redirect(`http://localhost:5173/login-success?session=${sessionId}`)

    } catch (error) {
        console.log('Callback Error : ', error);
        res.status(500).send('An error occurred during authentication');
    }
});


router.get('/session', (res, req) => {
    const session = req.query;

    if(!session) { 
        return res.status(400).json({
            error : "Missing Session Id"
        })
    };

    const data = getSession(session);

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
                Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toSorted('base64'),
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

export default router;