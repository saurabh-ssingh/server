const dotenv = require('dotenv')
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());

app.use(require('./routes/studentAuth')); //link studetAuth file
app.use(require('./routes/employerAuth')); //Link employerAuth file
app.use(require('./routes/internshipDetailsAuth')); // linking of internship detail auth file
const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.send('Hello World! frm app.js')
  })

app.get('/registration/student',(req,res)=>{
    res.send(`welcome at student registration`)
})
  
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })



