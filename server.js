import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cors from 'cors'
import 'express-async-errors'
import morgan from 'morgan'
dotenv.config();
//db and authenticate user
import connectDB from './db/connect-db.js';
const connectionString = process.env.MONGO_URL

//routes
import authRouter from './routes/auth-routes.js'
import jobRouter from './routes/jobRoutes.js'


//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authMiddleware from './middleware/auth.js'

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200
    })
);
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(express.json())


app.get('/', (req, res) => {

    res.json({ msg: 'Welcome!' })
})

app.get('/api/v1', (req, res) => {

    res.json({ msg: 'API' })
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authMiddleware, jobRouter)

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000


const start = async () => {
    try {
        await connectDB(connectionString);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}

start();