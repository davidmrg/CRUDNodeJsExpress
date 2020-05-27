var express = require('express');
var router = express.Router();

//importar scheme alumnos
const Alumnos = require('../models/alumnos')


router.get('/', async (req, res) => {
    const listaRegistros = await Alumnos.find();
    //console.log(listaRegistros);

    res.render('index',{
        listaRegistros
    });
});

router.get('/formulario',(req, res) => {
    res.render('formulario');
});

router.post('/add', async (req, res) => { //en lugar de usar then (promesa) usamos async
    console.log(new Alumnos (req.body));
   const objAlumnos = new Alumnos(req.body); //obtengo los datos
   await objAlumnos.save(); //operacion asíncrona, por eso usamos await
   res.render('formulario'); //para volver a imprimir pág. formulario limpia
});

router.get('/delete',async(req, res) => {
    const listaRegistros = await Alumnos.find();
    res.render('delete',{
        listaRegistros
    });
}); 

router.get('/delete/:id', async(req, res) => {
    
    const { id } = req.params;
    console.log(id);
    await Alumnos.remove({_id: id});
    console.log("registro borrado");
    res.redirect('/');

});


router.get('/edit',async(req, res) => {
    const listaRegistros = await Alumnos.find();
    res.render('edit',{
        listaRegistros
    });
}); 

router.get('/edit/:id', async(req, res) => {
    const listaRegistros = await Alumnos.find();
    const { id } = req.params;
    //console.log(id);
    const alumno = await Alumnos.findById({_id: id});
    
    res.render('updateForm',{
        alumno
    });
});

router.post('/edit/:id', async (req, res) => {
    
    const { id } = req.params;
    await Alumnos.update({_id: id}, req.body);
    console.log("datos actualizados");
    res.redirect('/');
});

module.exports = router;