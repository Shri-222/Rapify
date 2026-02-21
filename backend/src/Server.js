
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

app.set('trust proxy', 1); 
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin : [
            'https://rapify.pages.dev',
            'http://localhost:5173'
        ],
        credentials : true
    }
));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/spotify', spotifyRoutes);
app.use('/api/v1/tellMe', whatTells)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.listen(PORT, () => {
    console.log(`Server Is Running ${PORT} `);
})

DBConnect();