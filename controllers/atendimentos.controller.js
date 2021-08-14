const Atendimento = require('../models/atendimentos.model')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.getAtendimentosList(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.getUniqAtendimento(id, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Atendimento.updateAtendimento(id, values, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.deleteAtendimento(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.saveAtendimento(atendimento, res)
    })
}