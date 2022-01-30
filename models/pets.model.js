const fileUpload = require('../archives/uploadDeArquivos')
const Repository = require('../infra/database/queries')

class Pet {
    createPet(pet) {
        return new Promise((resolve, reject) => {
            fileUpload(pet.imagem, pet.nome, (error, filePath) => {
                if (error) {
                    reject(error)
                } else {
                    const petToSave = {
                        nome: pet.nome,
                        imagem: filePath
                    }
                    resolve(Repository.savePet(petToSave)
                        .then((response) => { return response }))
                }
            })
        })
    }
}

module.exports = new Pet()