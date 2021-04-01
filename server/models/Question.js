import mongoose from 'mongoose'

const { Schema, model } = mongoose

const questionSchema = new Schema({
  number: { type: String, required: true },
  indicator: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String },
  source: { type: String },
  units: { type: String },
  reverse: { type: Boolean },
  criteries: [{ type: String }],
  m: { type: String },
  h: { type: String },
  isDeleted: { type: Boolean }
})

export default model('Question', questionSchema)