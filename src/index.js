const express = require('express');
const path = require('path');
const pug = require('pug');
const methodOverride = require('method-override');
const sesion = require('express-session');
const flash = require('connect-flash');//enviar mensajes entre multiples vistas

//Initializations
const app = express();
require('./database');

//config 
app.set('port', process.env.Port || 3000);
app.set('views', path.join(__dirname, 'views'));
//se indica el motor de plantillas
app.set("view engine", "pug");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));//para que los form envien otros tipos de methods

app.use(sesion({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));//autenticar usuarios

//usando flash 
app.use(flash());

//global variables

//declarando variables globales para los mensajes de error y éxito
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');//success_msg
    res.locals.error_msg = req.flash('error_msg');
    next();
});
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