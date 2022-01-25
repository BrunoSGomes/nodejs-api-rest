const Pet = require('../models/pets.model')

module.exports = app => {
    app.post('/pet', (req, res) => {
        const pet = req.body
        Pet.createPet(pet)
            .then((response) => res.status(201).json(response))
            .catch((error) => res.status(400).json(error))
    })
}