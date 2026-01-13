
import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'
import spotifyRoutes from './routes/spotify.js'

import { DBConnect } from './database/database.js';

const app = express()

app.use(cors(
    {
        origin : 'http://localhost:5173',
        credentials : true
    }
));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/spotify', spotifyRoutes);

app.get('/test-cookie', (req, res) => {
    res.cookie('test_cookie', 'test_value', {
        httpOnly : true,
        sameSite : 'lax',
        secure : false,
        path : '/'
    });
    res.send('Cookies Set');
})


app.listen(8000, () => {
    console.log('Server Is Running On Port 8000');
})

DBConnect();