import express from 'express'
import cors from 'cors'

import usersRouter from './routes/users.js'
import municipalitiesRouter from './routes/municipalities.js'
import questionsRouter from './routes/questions.js'
import answersRouter from './routes/answers.js'
import indicatorsRouter from './routes/indicators.js'
import seedRouter from './routes/seed.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/municipalities-quiz/api/users', usersRouter)
app.use('/municipalities-quiz/api/municipalities', municipalitiesRouter)
app.use('/municipalities-quiz/api/questions', questionsRouter)
app.use('/municipalities-quiz/api/answers', answersRouter)
app.use('/municipalities-quiz/api/indicators', indicatorsRouter)
app.use('/municipalities-quiz/api/seed', seedRouter)

const listenApp = port => app.listen(port, () => console.log(`Server started on port ${port}`))

export default listenApp