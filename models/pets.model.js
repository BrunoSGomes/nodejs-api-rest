const fileUpload = require('../archives/uploadDeArquivos')
const Repository = require('../infra/database/queries')

class Pet {
    createPet(pet) {
        fileUpload(pet.imagem, pet.nome, (error, filePath) => {
            if (error) {
                return new Promise((resolve, reject) => reject(error))
            } else {
                const petToSave = {
                    nome: pet.nome,
                    imagem: filePath
                }
                return Repository.savePet(petToSave)
                    .then((response) => { return response })
            }
        })
    }
}

module.exports = new Pet()