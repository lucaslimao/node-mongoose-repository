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

const createModel = async (modelName, modelSchema) => {

    const model = setup(modelName, modelSchema)

    await model.createCollection()

    return {
        name: modelName,
        ...model
    }
}

const mapModel = async (modelName, tableName, schema, opts = {}) => {

    const model = await createModel(tableName, new Schema(schema, opts))

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