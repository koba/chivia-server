const express = require('express')
const app = express()
const Chivia = require('./chivia')

let server = new Chivia()

app.get('/', function (req, res) {
    res.send(server.easiestRoute())
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})