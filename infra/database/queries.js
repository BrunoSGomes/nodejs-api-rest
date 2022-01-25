const getConnection = require('typeorm').getConnection('sqlserver')
const atendimentoEntity = require('../../entities/atendimento.entity')
const petEntity = require('../../entities/pet.entity')

class Repository {

    // Atendimentos integration

    saveAtendimento(completeAtendimento) {
        return new Promise((resolve, reject) => {
            getConnection.getRepository(atendimentoEntity).save(completeAtendimento)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    getAtendimentosList() {
        return new Promise((resolve, reject) => {
            getConnection.getRepository(atendimentoEntity).find()
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    getUniqAtendimento(id) {
        return new Promise((resolve, reject) => {
            getConnection.getRepository(atendimentoEntity).findOne({ id: id })
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    updateAtendimento(id, values) {
        return new Promise((resolve, reject) => {
            getConnection.getRepository(atendimentoEntity).save({ id: id, ...values })
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    deleteAtendimento(id) {
        return new Promise((resolve, reject) => {
            getConnection.getRepository(atendimentoEntity).delete({ id: id })
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    // Pets integration

    savePet(petToSave) {
        return new Promise((resolve, reject) => {
            getConnection.getRepository(petEntity).save(petToSave)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

module.exports = new Repository()