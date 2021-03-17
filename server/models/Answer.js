import mongoose from 'mongoose'

const { Schema, model, ObjectId } = mongoose

const answerSchema = new Schema({
  question: { type: ObjectId, ref: 'Question' },
  municipality: { type: ObjectId, ref: 'Municipality' },
  date: { type: Date, default: Date.now },
  evaluations: [[{ type: Number }]],
  m: { type: Number },
  h: { type: Number }
})

export default model('Answer', answerSchema)