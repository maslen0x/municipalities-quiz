import mongoose from 'mongoose'

const { Schema, model } = mongoose

const questionSchema = new Schema({
  number: { type: String, required: true, unique: true },
  indicator: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String },
  source: { type: String },
  units: { type: String },
  criteries: [{ type: String }],
  m: { type: String },
  h: { type: String }
})

export default model('Question', questionSchema)