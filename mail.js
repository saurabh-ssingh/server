const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'target4ever101@gmail.com',
        pass: 'emailpass123'
    }
});

let mailDetails = {
    from: 'target4ever101@gmail.com',
    to: 'saur15161416@gmail.com',
    subject: 'Registration Confirmation',
    text: 'Welcome to our world'
};

transporter.sendMail(mailDetails,function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log('Email sent: ' +info.response);
    }
})
