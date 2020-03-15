const mongoose = require('mongoose')
const config = require('config')

const url = config.get('mongodb.url')

module.exports = () => mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })