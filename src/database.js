const mongoose = require('mongoose');

var config = {

}
//conection to database
mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(db => console.log('DB is Connected')).catch(err =>console.error(err));