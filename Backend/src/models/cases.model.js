const mongoose = require('mongoose')

const caseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
})

const fictionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
})

const caseModel = mongoose.model('cases', caseSchema)
const fictionModel = mongoose.model('fiction', fictionSchema)

module.exports = {caseModel , fictionModel}