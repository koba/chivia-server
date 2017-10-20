const async = require('async')
const exec = require('child_process').exec
const fs = require('fs')
const msgpack = require('../node_modules/msgpack-lite')
const path = require('path')
const request = require('requestretry')
const readline = require('readline')

if (process.argv.length <= 2) {
    console.log('Usage: node fetch_elevation_data.js [osrm_data_file] [profile_name]')
    return
}

const DATA_PATH = path.join(__dirname, '../data')
const OSRM_PATH = path.join(__dirname, '../node_modules/osrm')

let profile = process.argv[3]
let osrmPbfFilename = process.argv[2]
let osrmLatLngFilename = path.basename(osrmPbfFilename).replace('osm.pbf', 'txt')

let file = readline.createInterface({ input: fs.createReadStream(path.join(DATA_PATH, 'latlng', osrmLatLngFilename)) })
let locations = []
let elevationPromises = []
let elevationPromisesProgress = 0

file.on('line', line => {
    locations.push(line)
})

file.on('close', () => {
    for (let i = 0; i < locations.length; i += 90) {
        let locationsChunk = locations.slice(i, Math.min(i + 90, locations.length))
        let locationsUrlParam = locationsChunk.join('|')
        
        elevationPromises.push(next => {
            request(
                {
                    url: 'https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyD_iAAzmdbWoSU-3OVI6qZbnpHba0Rqf6c&locations=' + locationsUrlParam,
                    json: true
                },
                (err, res, body) => {
                    console.log('[ok] ' + ((elevationPromisesProgress++) + 1) + ' of ' + elevationPromises.length)
                    next(null, body.results)
                }
            )
        })
    }

    async.series(elevationPromises, (err, values) => {
        let arr = [].concat.apply([], values)
        let map = {}
        
        arr.forEach(item => {
            map[item.location.lat + ',' + item.location.lng] = item.elevation
        })

        if (!fs.existsSync(path.join(OSRM_PATH, 'profiles/data'))) {
            fs.mkdirSync(path.join(OSRM_PATH, 'profiles/data'))
        }

        let fileStream = fs.createWriteStream(path.join(OSRM_PATH, 'profiles/data', profile + '_elevation.msp'))
        let encodeStream = msgpack.createEncodeStream()
        encodeStream.pipe(fileStream)
        encodeStream.write(map)
        encodeStream.end()

        fs.writeFileSync(path.join(__dirname, '../fetch_elevation_data.log'), JSON.stringify(map, null, 4))
    })
})
