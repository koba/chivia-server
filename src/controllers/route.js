const router = require('express').Router()
const Chivia = require('../chivia')

let chivia = new Chivia()

router.get('/', (req, res) => {
    let from = req.query.from.split(',').map(i => +i)
    let to = req.query.to.split(',').map(i => +i)

    chivia
        .route(from, to)
        .then(route => {
            res.send(route)
        })
        .catch(err => {
            res.status(501).send(err)
        })
})

module.exports = router