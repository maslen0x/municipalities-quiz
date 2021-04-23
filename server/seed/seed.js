import dotenv from 'dotenv'

dotenv.config()

import Municipality from '../models/Municipality.js'
import Question from '../models/Question.js'

import municipalities from './municipalities.js'
import questions from './questions.js'

import connectDB from '../db.js'

const MONGO_URL = process.env.MONGO_URL

const seed = async () => {
  try {
    await connectDB(MONGO_URL)
    await Municipality.insertMany(municipalities)
    await Question.insertMany(questions)
    console.log('OK')
  } catch (e) {
    console.log(e)
  }
  process.exit(1)
}

seed()