const dateParse = require('date-fns').parse
const isAfter = require('date-fns').isAfter
const Repository = require('../infra/database/queries')

class Atendimento {
    constructor() {
        this.isValidDate = ({ serviceDate, creationDate }) => isAfter(serviceDate, creationDate)
        this.isValidClient = ({ length }) => length >= 5
        this.validation = (params) => this.validations.filter((field) => {
            const { name } = field
            const param = params[name]

            return !field.valid(param)
        })
        this.validations = [
            {
                name: 'date',
                valid: this.isValidDate,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'client',
                valid: this.isValidClient,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    saveAtendimento(atendimento) {
        const serviceDate = dateParse(atendimento.serviceDate, 'dd/MM/yyyy', new Date())
        const creationDate = new Date()

        const params = {
            date: { serviceDate, creationDate },
            client: { length: atendimento.name.length }
        }
        const errors = this.validation(params)
        const haveError = errors.length

        if (haveError) {
            return new Promise((resolve, reject) => reject(errors))
        } else {
            const completeAtendimento = { ...atendimento, creationDate, serviceDate }
            return Repository.saveAtendimento(completeAtendimento)
                .then((response) => { return response })
        }
    }

    getAtendimentosList() {
        return Repository.getAtendimentosList()
            .then((response) => { return response })
    }

    getUniqAtendimento(id) {
        return Repository.getUniqAtendimento(id)
            .then((response) => { return response })
    }

    updateAtendimento(id, values) {
        if (values.serviceDate) {
            values.serviceDate = dateParse(values.serviceDate, 'dd/MM/yyyy', new Date())
        }
        return Repository.updateAtendimento(id, values)
            .then((response) => { return response })
    }

    deleteAtendimento(id) {
        return Repository.deleteAtendimento(id)
            .then((response) => { return response })
    }
}

module.exports = new Atendimento()