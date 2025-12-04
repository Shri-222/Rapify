
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Rapify Backend Running');
})

app.listen(8888, () => {
    console.log('Server Is Running On Port 8888');
})