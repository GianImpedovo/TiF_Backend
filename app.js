import express, { json } from 'express'
import { userRouter } from './src/routes/user.js'

const app = express()
app.use(express.json())
app.use(userRouter)

export default app