import axios from "axios";
import { destroySession } from "../utility/sessionStore.js";
import User from "../model/user.js";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const refreshTokenValidate = async ( req, res, next ) => {

    const session = req.session;

    const currentTime = Date.now();

    if ( currentTime < session.sessionData.expires_at ) {
        next();
    }
    else {

        try {

            const user = await User.findOne({ userId : session.sessionData.spotifyId });

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
                        'Basic ' + 
                        Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }

            )

            const { access_token, expires_in, refresh_token } = response.data;

            const expires_at = Date.now() + expires_in * 1000;

            // update session data 
            req.session.sessionData.spotifyId = sessionData.spotifyId;
            req.session.sessionData.access_token = access_token;
            req.session.sessionData.expires_at = expires_at;
            

            if ( refresh_token ) {
                User.updateOne(
                    { userId : sessionData.spotifyId },
                    { refresh_token : refresh_token }
                )
            }

            next();

        } catch (error) {
            destroySession( session.sessionId );
            res.clearCookie('session_id');
            return res.status(401).json({
                error : 'Failed to refresh Token'
            });
        }
    }
}

export default refreshTokenValidate;