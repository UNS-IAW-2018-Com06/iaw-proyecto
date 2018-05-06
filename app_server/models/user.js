const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    name: String, // Nombre del usuario
    //provider		: String, // Cuenta del usuario (Twitter o Facebook en este ejemplo)
    provider_id: { type: String, unique: true }, // ID que proporciona Twitter o Facebook
    photo: String, // Avatar o foto del usuario
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});

mongoose.model('User', UserScheme);