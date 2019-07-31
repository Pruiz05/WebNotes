const express = require('express');
const router = express.Router();

const Note = require('../models/Note.js');
const { isAuthenticated } = require('../helpers/auth');
 

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

//crear nueva Nota
router.post('/notes/new-note', isAuthenticated, async (req, res)=>{
    //validaciones de formulario
    const {title, description} = req.body;
    const errors =[]; //arreglo de errores
    //valores enviados vacios
    if (!title) {
        //enviar errores a la vista .pug
        errors.push({text: 'Please Write a Title'});
    }
    if (!description) {
        //enviar errores a la vista .pug
        errors.push({text: 'Please Write a Description'});
    }

    //validaciones para mostrar errores
    if(errors.length > 0){
        res.render('notes/new-note', {
            //enviar errores y los datos a la vista .pug
            errors, 
            title,
            description
        });
    }else{
        //res.send('ok');
        //Crear nueva nota
        const newNote =new Note({title, description});
        newNote.user = req.user.id;
        //guardar dato en mongodb
        await newNote.save();//await async method
        //enviar mensaje de exito a la vista
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes');
    }
    
    //console.log(req.body); 
    //res.send('ok');
});

//Consultar todas las notas de la BD
router.get('/notes', isAuthenticated,  async (req, res )=>{
    await Note.find({ user: req.user.id }, (err, _notes) => {
        if(err){
           console.log('error ' + err);
           return; 
        }
        res.render("../views/notes/all-notes", { notes: _notes });
        
    }).sort({date: 'desc'});//ordenar los datos por fecha de manera descendente
    //res.send('Notas de la base de datos');
});

//editar Nota
router.get("/notes/edit/:id", isAuthenticated, async (req, res) =>{   
    const _note = await Note.findById(req.params.id);
    //console.log(_note.description);
    res.render('../views/notes/edit-note', {_note});
});

router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
    //actualizar una nota

    //obtener valores enviados del form
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
});

//borrar nota
router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
    //actualizar una nota

    //obtener valores enviados del form
    await Note.findByIdAndDelete(req.params.id);
    //enviar mensage se ha eliminado nota
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
});

//1:55:28 / 3:20:51


//router.post("/notes/edit/:")


module.exports = router;