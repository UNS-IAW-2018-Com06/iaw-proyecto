const mongoose = require('mongoose');

const universidadSchema = new mongoose.Schema({
  nommbre: {    type: String,    required: true  },
  provincia: {    type: String,    required: true  },
  ciudad: {    type: String,    required: true  },
  direccion: {    type: String,    required: true  },
  telefono: {   type: Number,    required: true},
  web: {     type: String,   required: true},
  coordenadas: [{ 
      lat: { type: Number},
      lng: { type: Number}
  }],
  carreras_grado: [{
      nombre_carrera: { type: String, required: true},
      duracion: { type: Number,  required: true}
  }],
  comentarios: [{ type: String  }]
  
});

mongoose.model('Universidad', universidadSchema);