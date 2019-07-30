const mongoose =require('mongoose');
const Schema = mongoose.Schema;
//encriptar password
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {type: String, required: true}, 
    username: {type: String, required: true}, 
    password : {type: String, required: true},
    date: {type: Date, default: Date.now}
});

//encriptar password
UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await  bcrypt.genSalt(10);//aplicar 10 veces el algoritmo
    const hash = bcrypt.hash(password, salt);
    //contraseña encriptada
    return hash;
};


//comparar password para logearse
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)  
};

UserSchema.methods.comparePassword = function(password){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
};


//crear modelo
 
//exportar
module.exports = mongoose.model("User", UserSchema)