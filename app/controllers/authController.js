const User = require('../models/User')
const jwt = require('jsonwebtoken')
const tokenSecret = 'shktkbrs'

exports.user = async (req, res) => {
  try {
    res.json(await User.find(req.user))
  } catch (error) {
    console.log(error);
  }
}
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({
      username,
    })
    if (!user) {
      return res
        .status(422)
        .json({ errors: { username: [{ msg: 'Username not found' }] } })
    }
    if (user.password !== password) {
      return res
        .status(422)
        .json({ errors: { password: [{ msg: 'Wrong password' }] } })
    }
    const userLogin = jwt.sign(
      {
        id: user.id,
      },
      tokenSecret,
      {
        expiresIn: '1440m',
      },
    )
    res.json({ token: userLogin })
  } catch (err) {
    console.log(err);
  }
}