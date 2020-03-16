const chai = require('chai')
const repository = require('../src/index')

const schema = {
    name: String,
    email: String
}

describe('Mapping model', () => {

    before( () => {
        model = repository.map('Tests', 'table-tests', schema).get('Tests')
    })

    it('Testing created table', () => {
        chai.assert(model.name, 'table-tests')
    })

    it('Saving model', async () => {   

        const doc = await model.create({ name: 'Teste', email: 'teste@email.com.br' })

        chai.assert.exists(doc, '_id')

    })

})