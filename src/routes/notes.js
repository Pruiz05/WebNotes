const express = require('express');
const router = express.Router();

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', (req, res)=>{
    //validacioones de formulario
    const {title, description} = req.body;
    const errors =[];
    //valores enviados vacios
    if (!title) {
        errors.push({text: 'Please Write a Title'})
    }
    if (!description) {
        errors.push({text: 'Please Write a Description'})
    }

    //
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors, 
            title,
            description
        })
    }else{
        res.send('ok');
    }
    
    //console.log(req.body); 
    //res.send('ok');
});

router.get('/notes', (req, res)=>{
    res.send('Notas de la base de datos');
});

module.exports = router;