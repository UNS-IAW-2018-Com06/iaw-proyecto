const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    usuario : String,
    comentario : String,
});

const universidadSchema = new mongoose.Schema({
    nommbre: { type: String, required: true },
    provincia: { type: String, required: true },
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    web: { type: String, required: true },
    coordenadas: {type : [Number], required: true, index: '2dsphere'},
    carreras_grado: [{
        nombre_carrera: { type: String, required: true },
        duracion: { type: Number, required: true }
    }],
    comentarios: {type : [comentarioSchema]}
});

mongoose.model('Universidad', universidadSchema, 'universidades');