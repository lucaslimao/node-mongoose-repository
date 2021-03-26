const mongoose = require('mongoose')
const config = require('config')

const url = config.get('mongodb.url')

module.exports = async (buffer, socketTimeoutMS = 10000, serverSelectionTimeoutMS = 5000) => {

    let opt = {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        socketTimeoutMS: socketTimeoutMS,
        serverSelectionTimeoutMS: serverSelectionTimeoutMS
    }

    if (!buffer) {
        opt = { ...opt, bufferCommands: false, bufferMaxEntries: 0 }
    }

    return await mongoose.connect(url, opt)
    
}