import Municipality from '../models/Municipality.js'

import errorHandler from '../utils/errorHandler.js'

export const create = async (req, res) => {
  try {
    const municipalities = req.body
    await Municipality.insertMany(municipalities)
    return res.json(municipalities)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const getAll = async (req, res) => {
  try {
    const municipalities = await Municipality.find()
    return res.json(municipalities)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}