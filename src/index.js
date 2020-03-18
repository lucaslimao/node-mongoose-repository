const mongoose = require('mongoose')
const connection = require('./connection/index')
const logger = require('./utils/logger/index')

const Schema = mongoose.Schema

const models = []

const logPrefix = '[LOGGER]'

const setup = (tableName, schema) => {

    connection()

    logger.info(`${logPrefix}[Setup] Connection success; ${tableName}; `)

    const model = mongoose.model(tableName, schema)

    return model

}

const createModel = (modelName, modelSchema) => {

    const model = setup(modelName, modelSchema)

    model.name = modelName

    return model

}

const mapModel = (modelName, tableName, schema, opts = {}) => {

    const model = createModel(tableName, new Schema(schema, opts))

    logger.info(`${logPrefix}[Map Model] Mapping success; ${tableName}; `)

    models[`${modelName}`] = model

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