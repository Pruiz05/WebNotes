const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//crear schema
const NoteSchema = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String}
});

//crear modelo
var Notes = mongoose.model("Note", NoteSchema)
//exportar
module.exports = Notes;