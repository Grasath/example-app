const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const {count} = require('./database.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',`${__dirname}/views`);



app.get('/',(req,res)=>{
    const run = async()=>{
        try{
            const result = await count();
            res.render('index',{c:result});
        }
        catch (e){
            console.log(e);
        }
    }
    run();    
})








app.listen(port,()=>{
    console.log(`server starting on ${port}`);
})