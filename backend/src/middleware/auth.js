
import { getSession } from "../sessionStore.js";

const verifySession = ( req, res, next ) => {

    const sessionId = req.query.session;

    if(!sessionId) {
        return res.status(401).json({ error : 'Unauthorized' });
    }

    const sessionData = getSession(sessionId);

    if(!sessionData) { 
        return res.status(401).json({ error : 'Unauthorized' });
    }

    req.sessionData = sessionData;

    next();
}

export default verifySession;


