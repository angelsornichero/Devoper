import express from 'express'
import 'dotenv/config'
import router from './routes/router.js'
import morgan from 'morgan'
import cors from 'cors'


const app = express()

// App Variables
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Router
app.use('/', router)

export default app;