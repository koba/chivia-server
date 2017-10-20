const execSync = require('child_process').execSync
const fs = require('fs')
const path = require('path')

if (process.argv.length <= 2) {
    console.log('Usage: node build_osrm_data.js [osrm_data_file] [profile_name]')
    return
}

const DATA_PATH = path.join(__dirname, '../data')
const OSRM_PATH = path.join(__dirname, '../node_modules/osrm')

let profile = process.argv[3]
let osrmPbfFilename = process.argv[2]
let osrmFilename = osrmPbfFilename.replace('osm.pbf', 'osrm')

// fetch elevation data if doesn't exists
if (!fs.existsSync(path.join(OSRM_PATH, 'profiles/data', profile + '_elevation.msp'))) {
    execSync('node ' + path.join(__dirname, 'fetch_elevation_data.js') + ' ' + osrmPbfFilename + ' ' + profile)
}
else {
    console.log('elevation data for profile already exists')
}

// copy profile to osrm profiles folder
execSync('cp ' + path.join(DATA_PATH, 'profiles', profile + '.lua') + ' ' + path.join(OSRM_PATH, 'profiles', profile + '.lua'))

// process profile
execSync(path.join(OSRM_PATH, 'lib/binding/osrm-extract') + ' -p ' + path.join(OSRM_PATH, 'profiles', profile + '.lua') + ' ' + path.join(DATA_PATH, 'osrm', osrmPbfFilename), { stdio: 'inherit' })
execSync(path.join(OSRM_PATH, 'lib/binding/osrm-partition') + ' ' + path.join(DATA_PATH, 'osrm', osrmFilename))
execSync(path.join(OSRM_PATH, 'lib/binding/osrm-customize') + ' ' + path.join(DATA_PATH, 'osrm', osrmFilename))