const mongoose = require('mongoose')
const connection = require('./connection/index')
const logger = require('./utils/logger/index')

const Schema = mongoose.Schema

const models = []

const logPrefix = '[LOGGER]'

const setup = async (tableName, schema, buffer) => {

    if (process.env.NOVE_ENV === 'development') {
        mongoose.set('debug', true)
    }

    await connection(buffer)

    logger.info(`${logPrefix}[Setup] Connection success; ${tableName}; `)

    const model = mongoose.model(tableName, schema)

    return model

}

const createModel = async (modelName, modelSchema, indexes, buffer) => {

    indexes.map(
        i => {
            modelSchema.index(i)
        }
    )

    const model = await setup(modelName, modelSchema, buffer)

    model.name = modelName

    return model

}

const mapModel = async (modelName, tableName, schema, opts = {}, indexes = [], buffer = true) => {

    let model = models[`${modelName}`]

    if (!model) {

        const model = await createModel(tableName, new Schema(schema, opts), indexes, buffer)

        logger.info(`${logPrefix}[Map Model] Mapping success; ${tableName}; `)

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
        get: getModel
    }

}

exports = module.exports = repository()