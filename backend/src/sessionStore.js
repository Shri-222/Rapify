
const session = {};

export const createSession = (data) => {
    const id = Math.random().toString(36).substring(2, 15);
    session[id] = data;
    return id;
}

export const getSession = (id) => session[id];