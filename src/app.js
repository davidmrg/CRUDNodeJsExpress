const path = require('path');
const express = require('express');
const app = express();

var mongoose = require('mongoose');

//importar rutas de carpeta routes
const indexRoutes = require('./routes/index');  

//configuraciones
app.set('port', process.env.PORT || 3000);
//app.set('views',express.static(__dirname + '/views'));
//app.set('views', '../views'); //para indicar en dónde está el folder "views"
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs'); //para poder usar ejs como motor de plantilla

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

//middlewares: (son funciones que se ejecutan antes que lleguen a las rutas)
app.use(express.urlencoded({extended: false})); //para entender datos enviados desde un form html
//rutas que se usarán:
app.use('/', indexRoutes);
app.use('/formulario', indexRoutes);
app.use('/add', indexRoutes);
app.use('/delete', indexRoutes);
//app.use('/delete/id', indexRoutes);
// configurar mongoos para ejecutar promesas:
mongoose.Promise = global.Promise;

//iniciar el server & conectar a MongoDb Cloud
mongoose.connect("mongodb+srv://david:12345@cluster0-bwg2g.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("La conexión con la base de datos se hizo correctamente");

    app.listen(app.get('port'), () => {
        console.log(`Servidor corriendo en puerto ${app.get('port')}`);
    });

});

