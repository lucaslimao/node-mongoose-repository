const mongoose = require('mongoose')
const config = require('config')

const url = config.get('mongodb.url')

module.exports = async (buffer, keepAlive = true, keepAliveInitialDelay = 300000, socketTimeoutMS = 20000, serverSelectionTimeoutMS = 5000) => {

    let opt = {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        socketTimeoutMS: socketTimeoutMS,
        serverSelectionTimeoutMS: serverSelectionTimeoutMS,
        keepAlive: keepAlive,
        keepAliveInitialDelay: keepAliveInitialDelay
    }

    if (!buffer) {
        opt = { ...opt, bufferCommands: false, bufferMaxEntries: 0 }
    }

    return await mongoose.connect(url, opt)
    
}