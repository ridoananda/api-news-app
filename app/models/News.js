const moongose = require('mongoose')

const schema = new moongose.Schema(
  {
    user: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const News = moongose.model('News', schema)
module.exports = News