const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


/* Renderizar el Formulario  de inicio de sesion*/
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});


router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',//login succes
    failureRedirect: '/users/signin',//fallo en el login
    failureFlash: true//mensajes flash
}));


/* Formulario de creacion de usuario */
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});


/* Crear Cuenta */
router.post('/users/signup', async (req, res) => {
    const { email, username, password, password_confirmation } = req.body;
    const errors = [];
    if (!email) {
        errors.push({ text: 'Please write a Email' });
    }

    if (!username) {
        errors.push({ text: 'Please write a Username' });
    }

    if (!password) {
        errors.push({ text: 'Please write a Password' });
    }

    if (!password_confirmation) {
        errors.push({ text: 'Please write a Password Confirmation' });
    }

    if (password != password_confirmation) {
        errors.push({ text: 'Password do not match' });
        //req.flash('error_msg', 'Incorrect Password');
    }

    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }

    //validaciones para mostrar errores
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            email, 
            username, 
            password,
            password_confirmation
        });
    } else {
        //res.send('ok');
        //validar correo
        const emailUser = User.findOne({email: email});
        //console.log(emailUser);
        if (emailUser) {
            req.flash('error_msg', 'The Email is already in use.');
            res.redirect('/users/signup');
            return;
        }
        //Crear nuevo usuario
        const newUser = new User({email, 
            username, 
            password });
        //utilizar el metodo para encriptar la contraseña
        newUser.password = await newUser.encryptPassword(password);
        //guardar dato en mongodb
        await newUser.save();//await async method
        //enviar mensaje de exito a la vista
        req.flash('success_msg', 'User Added Successfully');
        res.redirect('/');
    }
});

/* Cerrar sesion */
router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;