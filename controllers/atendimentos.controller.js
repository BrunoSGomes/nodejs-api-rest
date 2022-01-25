const Atendimento = require('../models/atendimentos.model')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.getAtendimentosList()
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(400).json(error))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.getUniqAtendimento(id)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(400).json(error))
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Atendimento.updateAtendimento(id, values)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(400).json(error))
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.deleteAtendimento(id)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(400).json(error))
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.saveAtendimento(atendimento)
            .then((response) => res.status(201).json(response))
            .catch((error) => res.status(400).json(error))
    })
}