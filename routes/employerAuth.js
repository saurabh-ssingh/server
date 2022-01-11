
const bcrypt = require('bcryptjs');
const express = require('express');
const router  = express.Router();

require('../db/conn');
const Employer = require('../model/employerSchema');

// router.get('/',(req,res)=>{
//     res.send(`Home Page from auth.js emploer file`);
// })

router.post('/registration/employer',async (req,res)=>{
    const{email,password,cPassword,firstName,lastName,mobile}=req.body;

    if(!email|| !password || !cPassword || !firstName || !lastName || !mobile){
        return res.status(422).json({error :'Please fillll all the field'});
    }
    if(password != cPassword){
        return res.status(422).json({error:'Password and confirm password are not same'})
    }
    try{
        const employerExist = await Employer.findOne({ email : email });

        if(employerExist){
            return res.status(422).json({error :'Email already Exist'});
        }else if(password != cPassword){
            return res.status(422).json({message:'password are not matching'});
        }
        else{

            const employer = new Employer({email,password,cPassword,firstName,lastName,mobile});

            const employerRegistered = await employer.save();
        
            if(employerRegistered){
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
router.post('/login/employer',async (req,res)=>{
    

    try{
        const{email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please fill both field properly"})
        }

        const employerLogin = await Employer.findOne({email:email});

        if(employerLogin){

            const isPasswordMatch = await bcrypt.compare(password, employerLogin.password);

            const token = await employerLogin.generateAuthToken();
            console.log(token);

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
module.exports = router;