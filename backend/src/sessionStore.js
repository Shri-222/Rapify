
import crypto from 'crypto';

const session = {};

export const createSession = (data) => {
    const id = crypto.randomUUID();
    session[id] = data;
    return id;
}

export const getSession = (id) => session[id];