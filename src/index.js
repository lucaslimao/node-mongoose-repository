const mongoose = require('mongoose')
const connection = require('./connection')
const logger = require('./utils/logger')

const Schema = mongoose.Schema

const models = []

const logPrefix = 'MONGOOSE REPOSITORY'

let conn = null

const setup = async (tableName, schema, buffer, socketTimeoutMS, serverSelectionTimeoutMS) => {

    if (process.env.NOVE_ENV === 'development') {
        mongoose.set('debug', true)
    }

    if (!conn) {
        logger.info(`${logPrefix} :: SETUP :: Connecting First Time.`)
        conn = await connection(buffer, socketTimeoutMS, serverSelectionTimeoutMS)
    }

    logger.info(`${logPrefix} :: SETUP :: Connection success :: ${tableName}`)

    const model = mongoose.model(tableName, schema)

    return model

}

const createModel = async (modelName, modelSchema, indexes, buffer, socketTimeoutMS, serverSelectionTimeoutMS) => {

    indexes.map(
        i => {
            modelSchema.index(i)
        }
    )

    const model = await setup(modelName, modelSchema, buffer, socketTimeoutMS, serverSelectionTimeoutMS)

    model.name = modelName

    return model

}

const mapModel = async (modelName, tableName, schema, opts = {}, indexes = [], buffer = true, socketTimeoutMS, serverSelectionTimeoutMS) => {

    let model = models[`${modelName}`]

    if (!model) {

        const model = await createModel(tableName, new Schema(schema, opts), indexes, buffer, socketTimeoutMS, serverSelectionTimeoutMS)

        logger.info(`${logPrefix} :: MAP MODEL :: SUCCESS :: ${tableName}`)

        models[`${modelName}`] = model

    }

    return repository()

}

const getModel = modelName => {

    const model = models[`${modelName}`]

    if (!model) {
        throw new Error(`[Repository ${modelName}]: Not Found Model: ${modelName}`)
    }

    return model

}

const repository = () => {

    return {
        map: mapModel,
        get: getModel,
        Schema: mongoose.Schema,
        Types: mongoose.Types
    }

}

exports = module.exports = repository()