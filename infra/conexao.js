const typeorm = require('typeorm')
const ormConfig = require('../ormconfig.json')
const connection = typeorm.createConnection(ormConfig)
    .then(() => {
        console.log('Database running.')
    }).catch(err => {
        console.log(err)
    })

module.exports = connection