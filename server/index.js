import dotenv from 'dotenv'

import listenApp from './app.js'
import connectDB from './db.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

const start = async () => {
  try {
    await connectDB(MONGO_URL)
    listenApp(PORT)
  } catch (e) {
    console.log(e)
  }
}

start()