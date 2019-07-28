const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//crear schema
const NoteSchema = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

//crear modelo
var Notes = mongoose.model("Note", NoteSchema)
//exportar
module.exports = Notes;