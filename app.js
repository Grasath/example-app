const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const dotenv = require('dotenv');
const {count} = require('./database.js');
dotenv.config();
const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',`${__dirname}/views`);



app.get('/',async(req,res)=>{
    const result = await count();
    res.render('index',{c:result});
})








app.listen(port,()=>{
    console.log(`server starting on ${port}`);
})