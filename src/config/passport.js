const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/User');


//estrategia de autenticación
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        //termina el proceso de autenticacion
        return done(null, false, {message: 'Not User Found'});
    }else{
        //validar la contraseña que se ha ingresado en el login con el metodo encriptado
        const match = await user.matchPassword(password);
        if (match) {
            ///el primer parametro para error (null= no hay error)
            //segundo false = cuando no hay ningun usuario
            return done(null, user);
        }else{
            //contraseña incorrecta
            return done(null, false, {message:'Incorrect Password'});
        }
    }
}));

//guardar sesion al inicio
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//
passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});
