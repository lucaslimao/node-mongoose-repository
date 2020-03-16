const mongoose = require('mongoose')
const connection = require('./connection/index')

const Schema = mongoose.Schema

const models = []

const setup = (tableName, schema) => {

    try {

        connection()

        const model = mongoose.model(tableName, schema)

        return model

    } catch(error) {
        throw new Error(`Erro na configuração da tabela, ${tableName}, ${error.message}`)
    }

}

const createModel = (modelName, modelSchema) => {

    const model = setup(modelName, modelSchema)

    model.name = modelName

    return model

}

const mapModel = (modelName, tableName, schema, opts = {}) => {

    const model = createModel(tableName, new Schema(schema, opts))

    model.createCollection()

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