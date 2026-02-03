
import 'dotenv/config';
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'
import spotifyRoutes from './routes/spotify.js'
import whatTells from './routes/whatTells.js'

import { DBConnect } from './database/database.js';

const app = express()
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin : 'http://localhost:5173',
        credentials : true
    }
));

app.use('/auth', authRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/tellMe', whatTells)


app.listen(PORT, () => {
    console.log(`Server Is Running On http://localhost:${PORT} `);
})

DBConnect();