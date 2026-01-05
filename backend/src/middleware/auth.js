import { getSession } from "../sessionStore";

const requestAuth = ( req, res, next ) => {

    const sessionId = req.cookies.session_id;

    if(!sessionId) {
        return res.status(401).json({ error : 'Unauthorized' });
    }

    const sessionData = getSession(sessionId);

    if(!sessionData) { 
        return res.status(401).json({ error : 'Unauthorized' });
    }

    res.sessionData = sessionData;

    next();
}