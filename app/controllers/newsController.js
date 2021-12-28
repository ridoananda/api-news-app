const News = require('../models/News')

exports.store = async (req, res) => {
  try {
    const response = await News.insertMany({
      user: req.user,
      title: req.body.title,
      category: req.body.category,
      // thumbnail: req.body.thumbnail,
      text: req.body.text
    })
    res.json(response)
  } catch (error) {
    console.log(error);
    res.status(422).json(error)
  }
}
exports.destroy = async (req, res) => {
  try {
    await News.findOneAndDelete(req.body.id)
    res.json({ message: "News was deleted!" })
  } catch (error) {
    console.log(error);
  }
}
exports.get = async (req, res) => {
  try {
    const response = await News.find({ _id: req.params.id }).populate('user', 'username')
    res.json(response[0])
  } catch (error) {
    res.status(404).json(error)
  }
}
exports.getAll = async (req, res) => {
  try {
    const response = await News.find().sort({ createdAt: -1 })
    res.json(response)
  } catch (error) {
    console.log(error);
    // res.status(422).json(error)
  }
}