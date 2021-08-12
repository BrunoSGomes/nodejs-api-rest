const Atendimento = require('../models/atendimentos.model')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        res.send('Lista de atendimentos!')
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.saveAtendimento(atendimento, res)
    })
}