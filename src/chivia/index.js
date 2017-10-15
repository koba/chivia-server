const path = require('path')
const OSRM = require('osrm')

Chivia = function () {
    this.osrm = new OSRM({ 
        algorithm: 'MLD',
        path: path.join(__dirname, '../../data/uruguay/uruguay-latest.osrm'),
        use_shared_memory: false
    })
}

Chivia.prototype.easiestRoute = () => {
    return 'ok'
}

module.exports = Chivia