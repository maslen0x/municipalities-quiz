import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import municipalitiesRouter from './routes/municipalities.js'
import questionsRouter from './routes/questions.js'
import usersRouter from './routes/users.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', usersRouter)
app.use('/api/municipalities', municipalitiesRouter)
app.use('/api/questions', questionsRouter)

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, mongoConfig).then(() => console.log('MongoDB connected'))
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()