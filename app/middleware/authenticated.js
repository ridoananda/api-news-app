const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated!' })
  }
  const token = authHeader.split(' ')[1]
  let decodedToken
  try {
    decodedToken = jwt.verify(token, 'shktkbrs')
  } catch (e) {
    return res.status(401).json({ message: 'Not authenticated!' })
  }
  if (!decodedToken) {
    return res.status(401).json({ message: 'Not authenticated!' })
  }
  try {
    let user = await User.findOne({ _id: decodedToken.id })
    req.user = user
  } catch (err) {
    return res.status(404).json({ message: 'User not found.' })
  }
  next()
}