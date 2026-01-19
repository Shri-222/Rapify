
import querystring from 'querystring';

const buildSpotifyAuthURL = ( { CLIENT_ID, REDIRECT_URI } ) => {

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-read-recently-played',
        'user-library-read'
    ].join(' ');
    
    return querystring.stringify({
        response_type : 'code',
        client_id : CLIENT_ID,
        scope : scope,
        redirect_uri : REDIRECT_URI,
        show_dialog : true
    });


}

export default buildSpotifyAuthURL;