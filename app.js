const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config({ path: '.env' })
const PORT = process.env.PORT || 8000
const indexRouter = require('./app/routes')

const mongoose = require('mongoose')

const connect = async () => {
	try {
		// Connect to Database
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('Database Connected!!!')
	} catch (error) {
		console.log('Failed to connect!', error)
	}
}
connect()
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404).json('Page not found!')
})

app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`),
)

module.exports = app