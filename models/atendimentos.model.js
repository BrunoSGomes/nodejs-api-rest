const getConnection = require('typeorm').getConnection
const dateFormat = require('date-fns').formatISO
const dateParse = require('date-fns').parse
const atendimentoRepository = require('../entities/atendimento.entity')

class Atendimento {
    saveAtendimento(atendimento, res) {
        const creationDate = new Date()
        const serviceDate = dateFormat(dateParse(atendimento.serviceDate, 'dd/mm/yyyy', new Date()))
        const completeAtendimento = { ...atendimento, creationDate, serviceDate }
        const getRepository = getConnection('default').getRepository(atendimentoRepository)
        getRepository.save(completeAtendimento)
            .then(response => {
                res.status(201).json(response)
            }).catch(err => {
                res.status(400).json(err)
            })
    }
}

module.exports = new Atendimento