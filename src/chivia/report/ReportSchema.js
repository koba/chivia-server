const mongoose = require('mongoose')
const ReportType = require('./ReportType')

module.exports = mongoose.Schema({
    type: { type: String, required: true, enum: ReportType },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
})