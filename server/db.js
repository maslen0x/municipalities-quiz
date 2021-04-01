import mongoose from 'mongoose'

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

const connectDB = url => mongoose.connect(url, mongoConfig).then(() => console.log('MongoDB connected'))

export default connectDB