const express = require('express');
const path = require('path');
const pug = require('pug');
const methodOverride = require('method-override');
const sesion = require('express-session');

//Initializations
const app = express();
require('./database');

//config 
app.set('port', process.env.Port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));//para que los form envien otros tipos de methods

app.use(sesion({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));//autenticar usuarios


//global variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server initializing
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});