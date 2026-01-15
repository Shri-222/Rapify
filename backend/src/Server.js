
import 'dotenv/config';
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
// import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'
import spotifyRoutes from './routes/spotify.js'

import { DBConnect } from './database/database.js';

const app = express()
const PORT = 8000;

// app.use(cors(
//     {
//         origin : 'http://localhost:5173',
//         credentials : true
//     }
// ));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/spotify', spotifyRoutes);

// Serve static files from the vite + react build 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '../../frontend/dist');

app.use(express.static(frontendPath));

app.get(/.*/, ( req, res ) => {
    res.sendFile(path.join(frontendPath, "index.html"));
})


app.listen(PORT, () => {
    console.log(`Server Is Running On http://localhost:${PORT} `);
})

DBConnect();