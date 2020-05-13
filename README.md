# node-mongoose-repository

Based in  [node-dynamoose-repository](https://github.com/salespaulo/node-dynamoose-repository) from [Paulo Sales](https://github.com/salespaulo)

## Examples

### Mapping
#### repository.js
```javascript

const repository = require('node-mongoose-repository')

...

const opt = { timestamps: true }

const UserIndex = [
    { email: 1 },
    { 'name': 'text'}
]

...

module.exports = () => {
    repository.map('User', getTableName('User'), userSchema, opt, UserIndex)
}
```

### Using the model

```javascript

const repository = require('node-mongoose-repository')

...

const model = repository.get('User')

const user = await model.findById(id)
    
```

### Debug mode

Set NOVE_ENV=development
