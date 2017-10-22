const fs = require('fs')
const path = require('path')
const router = require('express').Router()

router.get('/', (req, res) => {
    let workshops = fs.readFileSync(path.join(__dirname, '../../data/workshops/uruguay.json'))
    res.send(JSON.parse(workshops))
})

module.exports = router