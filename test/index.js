const chai = require('chai')
const repository = require('../src/index')

const schema = {
    name: String,
    email: String
}

describe('Mapping model', () => {

    before(async () => {

        repo = await repository.map('Tests', 'table-tests', schema)

        model = repo.get('Tests')

    })

    it('Testing Repository OK:', done => {
        chai.assert(model.name, 'table-tests')
        done()
    })

})