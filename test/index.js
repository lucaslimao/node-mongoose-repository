const chai = require('chai')
const repository = require('../src/index')

const schema = {
    name: String,
    email: String
}

describe('Mapping model', () => {

    before( async () => {
        repo = await repository.map('Test', 'table-test', schema, {}, [], false, true, 300000, 1000, 1000)
        model = repo.get('Test')
    })

    it('Testing Created Table', () => {
        chai.assert(model.name, 'table-test')
    })

    it('Saving Model Exists', async () => {   

        const doc = await model.create({ name: 'Teste Exists', email: 'teste@email.com.br' })

        chai.assert.exists(doc, '_id')

    })

})