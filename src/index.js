const express = require('express');
const path = require('path');
const pug = require('pug');
//
const app = express();

//config 
app.set('port', process.env.Port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");
//middleware

//global variables

//Routes

//Static Files

//Server initializing
app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
});