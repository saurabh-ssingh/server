const mongoose = require('mongoose')

//schema creation
const internshipDetailsSchema = new mongoose.Schema({
    internshipType:{
        type:String,
        required:true,
        trim : true
        
    },
    companyName:{
        type:String,
        required:true,
        trim:true
       
    },
    internshipLocation:{
        type:String,
        required:true,
        trim:true,
        minlength:3
        
    },
    startDate:{
        type:String,
        required:true,
        trim:true,
    },
    duration:{
        type:Number,
        required:true,
        trim:true,
    },
    stipend:{
        type:Number,
        required:true,
        trim:true,
    },
    // apply_by:{
    //     type:Date,
    //     default:Date.now(),
    //     required:true,
    //     trim:true,
    // },
    typeOfWork:{
        type:String,
        required:true,
        trim:true,
    }
})


const Internship = mongoose.model('INTERNSHIP_DETAIL',internshipDetailsSchema);
module.exports = Internship;