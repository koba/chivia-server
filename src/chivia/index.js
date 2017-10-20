const path = require('path')
const polyline = require('@mapbox/polyline')
const OSRM = require('osrm')

Chivia = function () {
    this.osrm = new OSRM({ 
        algorithm: 'MLD',
        path: path.join(__dirname, '../../data/osrm/uruguay.bicycle/uruguay-latest.osrm'),
        use_shared_memory: false
    })
}

Chivia.prototype.easiestRoute = function (from, to) {
    let osrm = this.osrm
    return new Promise((resolve, reject) => {
        osrm.route(
            {
                coordinates: [
                    from,
                    to
                ]
            },
            (err, res) => {
                if (err) reject(err)
                else {
                    res.routes.forEach(route => {
                        route.geometry = polyline.decode(route.geometry)
                    })

                    resolve(res)
                }
            }
        )
    })
}

module.exports = Chivia