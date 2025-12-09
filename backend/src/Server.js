
import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'
import spotifyRoutes from './routes/spotify.js'

const app = express()

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/spotify', spotifyRoutes);

app.get('/', (req, res) => {
    res.send('Rapify Backend Running');
})

app.listen(8000, () => {
    console.log('Server Is Running On Port 8000');
})