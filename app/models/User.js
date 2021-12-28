const moongose = require('mongoose')

const schema = new moongose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const User = moongose.model('User', schema)
module.exports = User