const router = require('express').Router()
const Chivia = require('../chivia')

router.get('/', (req, res) => {

})

router.post('/', (req, res) => {
    Chivia
        .report
        .insert(req.body)
        .then(() => {
            res.send('Ok')
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router