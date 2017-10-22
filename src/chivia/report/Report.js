const mongoose = require('mongoose')
const ReportSchema = require('./ReportSchema')

const ReportModel = mongoose.model('Report', ReportSchema)

Report = function () {
    this.db = mongoose.connect('mongodb://localhost:27017/chivia', {
        useMongoClient: true
    })
}

Report.prototype.insert = function (data) {
    return new Promise((resolve, reject) => {
        let obj = new ReportModel(data)
        obj.save(err => {
            if (err) reject(err)
            else {
                resolve()
            }
        })
    })
}

module.exports = Report