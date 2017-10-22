const fs = require('fs')
const path = require('path')
const router = require('express').Router()

router.get('/', (req, res) => {
    let stands = fs.readFileSync(path.join(__dirname, '../../data/stands/uruguay.json'))
    res.send(JSON.parse(stands))
})

module.exports = router