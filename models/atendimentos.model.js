const getConnection = require('typeorm').getConnection
const dateParse = require('date-fns').parse
const isAfter = require('date-fns').isAfter
const atendimentoRepository = require('../entities/atendimento.entity')

class Atendimento {
    saveAtendimento(atendimento, res) {
        const creationDate = new Date()
        const serviceDate = dateParse(atendimento.serviceDate, 'dd/MM/yyyy', new Date())
        const isValidDate = isAfter(serviceDate, creationDate)
        const isValidClient = atendimento.name.length >= 5
        const validations = [
            {
                name: 'data',
                valid: isValidDate,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'cliente',
                valid: isValidClient,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
        const errors = validations.filter(validation => !validation.valid)
        const haveError = errors.length
        if (haveError) {
            res.status(400).json(errors)
        } else {
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

    getAtendimentosList(res) {
        getConnection('default').getRepository(atendimentoRepository).find()
            .then(response => {
                res.status(200).json(response)
            }).catch(err => {
                res.status(400).json(err)
            })
    }

    getUniqAtendimento(id, res) {
        getConnection('default').getRepository(atendimentoRepository).findOne({ id: id })
            .then(response => {
                res.status(200).json(response)
            }).catch(err => {
                res.status(400).json(err)
            })
    }

    updateAtendimento(id, values, res) {
        if (values.serviceDate) {
            values.serviceDate = dateParse(values.serviceDate, 'dd/MM/yyyy', new Date())
        }
        getConnection('default').getRepository(atendimentoRepository).save({ id: id, ...values })
            .then(response => {
                res.status(200).json(response)
            }).catch(err => {
                res.status(400).json(err)
            })
    }

    deleteAtendimento(id, res) {
        getConnection('default').getRepository(atendimentoRepository).delete({ id: id })
            .then(() => {
                res.status(200).json({ id })
            }).catch(err => {
                res.status(400).json(err)
            })
    }
}

module.exports = new Atendimento