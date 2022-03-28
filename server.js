import express from 'express'
const app = express()
import dotenv from 'dotenv'
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

app.use(express.json())


app.get('/', (req, res) => {

    res.send('Welcome!')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobRouter)

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(connectionString);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}

start();