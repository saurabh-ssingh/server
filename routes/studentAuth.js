const bcrypt = require('bcryptjs');
const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

require('../db/conn');

const User = require('../model/studentSchema');

router.get('/',(req,res)=>{
    res.send(`Home Page from auth.js file`);
})


// router.post('/registration/student',(req,res)=>{
//     const{email,password,firstName,lastName}=req.body;
//     if(!email|| !password || !firstName || !lastName){
//         return res.status(422).json({error :'Please fill all the field'});
//     }

//     User.findOne({ email : email })
//         .then((userExist)=>{
//             if(userExist){
//                 return res.status(422).json({error :'Email already Exist'});
//             }

//             const user = new User({email,password,firstName,lastName});
//             user.save().then(()=>{
//                 res.status(201).json({message:"User Registerd Successfully"});
//             }).catch((err)=>res.status(500).json({message:'Registration failed'}));
//         })
//         .catch((err)=>{console.log(err)});
    
// })


router.post('/registration/student',async (req,res)=>{
    const{email,password,cPassword,firstName,lastName}=req.body;
    if(!email|| !password || !cPassword|| !firstName || !lastName){
        return res.status(422).json({error :'Please fill all the field'});
    }
    try{
        const userExist = await User.findOne({ email : email });

        if(userExist){
            return res.status(422).json({error :'Email already Exist'});
        }else if(password != cPassword){
            return res.status(400).json({error:'password are not matching'})
        }else{
           
            const user = new User({email,password,cPassword,firstName,lastName});
            
           

            const userRegistered = await user.save();
        
            if(userRegistered){
                res.status(201).json({message:"User Registerd Successfully"});
            }else{
                res.status(201).json({message:"User Registration Failed"});
            }

        }

        
    }catch(err){
        console.log(err);
    }
})



// login route
router.post('/login/student',async (req,res)=>{

    try{
        const{email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please fill both field properly"})
        }

        const studentLogin = await User.findOne({email:email});
        
        if(studentLogin){
            const isPasswordMatch = await bcrypt.compare(password, studentLogin.password);
            //token generating
            const token = await studentLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken",token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isPasswordMatch){
                res.status(400).json({error:"Invalid Credentialssss"});
            }else{
                res.json({message:'user Login Successfully'})
            }
        }
        else{
            res.status(400).json({error:"Invalidddddd Credentials"});
        }


    }catch(err){
        console.log(err)
    }
})

router.get('/registration/student', authenticate, (req,res)=>{
    res.send(`welcome at student registration`)
})



module.exports = router;