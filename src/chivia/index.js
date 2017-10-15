const path = require('path')
const OSRM = require('osrm')

Chivia = function () {
    this.osrm = new OSRM({ 
        algorithm: 'MLD',
        path: path.join(__dirname, '../../data/uruguay.bicycle/uruguay-latest.osrm'),
        use_shared_memory: false
    })
}

Chivia.prototype.easiestRoute = function () {
    let osrm = this.osrm
    return new Promise((resolve, reject) => {
        osrm.route(
            {
                coordinates: [
                    [-56.164684, -34.913842],
                    [-56.201119, -34.907648]
                ]
            },
            (err, res) => {
                if (err) reject(err)
                else resolve(res)
            }
        )
    })
}

module.exports = Chivia