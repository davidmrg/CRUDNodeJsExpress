//definiremos "schema" de la base de datos no relacional de mongoose

const mongoose = require('mongoose');

const Schema = mongoose.Schema; //método de mongoose que define como quedarán los datos en bdd
const AlumnoSchema = new Schema({
    nombres: String,
    contacto: String,
    comentarios: String,
    genero: String
});

module.exports = mongoose.model('alumnos', AlumnoSchema); //la colección se llamará alumnos 