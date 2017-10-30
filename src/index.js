const bodyParser = require('body-parser')
const express = require('express')

let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Chiviá')
})

app.use('/report', require('./controllers/report'))
app.use('/route', require('./controllers/route'))
app.use('/stand', require('./controllers/stand'))
app.use('/workshop', require('./controllers/workshop'))

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
})