import axios from "axios";
import { createSession } from "../sessionStore";
import User from "../model/user";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const refreshTokenValidate = async ( req, res, next ) => {

    const sessionData = req.sessionData;

    const currentTime = Date.now();

    if ( currentTime < sessionData.expires_in ) {
        next();
    }
    else {

        try {

            const user = await User.findOne({ userId : sessionData.spotifyId });

            if ( !user ) {
                return res.status(401).json({ error : 'Unauthorized' });
            }

            const refreshToken = user.refresh_token;

            if ( !refreshToken ) {
                return res.status(401).json({ error : 'Unauthorized' });
            }

            const refreshURL = 'https://accounts.spotify.com/api/token';

            const response = await axios.post(
                refreshURL,
                querystring.stringify(
                    {
                        grant_type : 'refresh_token',
                        refresh_token : refreshToken
                    }
                ),

                {
                    headers : {
                        Authorization : 
                        'Bearer ' + 
                        Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }

            )

            const { access_token, expires_in, refresh_token } = response.data;

            const sessionId = createSession(
                {
                    access_token,
                    spotifyId : sessionData.spotifyId,
                    expires_in 
                }
            )

            res.cookies(
                'session_id',
                sessionId,
            {
                httpOnly : true,
                sameSite : 'lax',
                secure : false,
                path : '/'
            }
            )

            if ( refresh_Token ) {
                User.updateOne(
                    { userId : sessionData.spotifyId },
                    { refresh_token : refresh_Token }
                )
            }


        } catch (error) {
            
        }
    }
    
    next();
}

export default refreshTokenValidate;