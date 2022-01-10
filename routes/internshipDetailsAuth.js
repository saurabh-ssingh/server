const express = require('express');
const router  = express.Router();


require('../db/conn');
const Internship = require('../model/internshipDetailsSchema');

router.get('/',(req,res)=>{
    res.send(`Home Page from auth.js file`);
})

router.post('/internships/type', async (req,res)=>{
    const{internshipType,companyName,internshipLocation,startDate,duration,stipend,typeOfWork}= req.body;
    if(!internshipType || !companyName || !internshipLocation || !startDate || !duration || !stipend || !typeOfWork){
        return res.status(422).json({error :'Please fillllll all the field'});
    }
    try{
        const internship = new Internship({internshipType,companyName,internshipLocation,startDate,duration,stipend,typeOfWork});
        //password has
            const internshipRegistered = await internship.save();
        
            if(internshipRegistered){
                res.status(201).json({message:"Internhsip Registerd Successfully"});
            }else{
                res.status(201).json({message:"Internship Registration Failed"});
            } 
    }catch(err){
        console.log(err);
    }
})
module.exports = router;