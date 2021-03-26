const mongoose = require('mongoose')
const connection = require('./connection')
const logger = require('./utils/logger')

const Schema = mongoose.Schema

const models = []

const logPrefix = 'REPOSITORY'

let conn = null

const setup = async (tableName, schema, buffer, connectTimeoutMS, serverSelectionTimeoutMS) => {

    if (process.env.NOVE_ENV === 'development') {
        mongoose.set('debug', true)
    }

    if (!conn) {
        logger.info(`${logPrefix} :: SETUP :: Connecting First Time.`)
        conn = await connection(buffer, connectTimeoutMS, serverSelectionTimeoutMS)
    }

    logger.info(`${logPrefix} :: SETUP :: Connection success :: ${tableName}`)

    const model = mongoose.model(tableName, schema)

    return model

}

const createModel = async (modelName, modelSchema, indexes, buffer, connectTimeoutMS, serverSelectionTimeoutMS) => {

    indexes.map(
        i => {
            modelSchema.index(i)
        }
    )

    const model = await setup(modelName, modelSchema, buffer, connectTimeoutMS, serverSelectionTimeoutMS)

    model.name = modelName

    return model

}

const mapModel = async (modelName, tableName, schema, opts = {}, indexes = [], buffer = true, connectTimeoutMS, serverSelectionTimeoutMS) => {

    let model = models[`${modelName}`]

    if (!model) {

        const model = await createModel(tableName, new Schema(schema, opts), indexes, buffer, connectTimeoutMS, serverSelectionTimeoutMS)

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