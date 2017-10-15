const express = require('express')
const app = express()
const Chivia = require('./chivia')

let server = new Chivia()

app.get('/', function (req, res) {
    server
        .easiestRoute()
        .then(route => {
            res.send(route)
        })
        .catch(err => {
            res.status(501).send(err)
        })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})