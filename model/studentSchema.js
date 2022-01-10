const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//schema creation
const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim : true,
        unique : true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7
    },
    cPassword:{
        type:String,
        required:true,
        trim:true,
        minlength:7
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3
        
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minlength:3
        
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})



// middleware  for hashing password
// pre => before saving the user in the database

studentSchema.pre('save', async function(next) {
        const salt = await bcrypt.genSalt(12);
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, salt);
            this.cPassword = await bcrypt.hash(this.cPassword, salt);
        }
        next();
    
})

//token generation
studentSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token});
        this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER',studentSchema);
module.exports = User;