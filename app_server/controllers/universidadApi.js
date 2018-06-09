const mongoose = require('mongoose');
const Universidad = mongoose.model('Universidad');


const getUniversidades = function (req, res) {

	if (req.query.carreras_grado) {
		var carrera = req.query.carreras_grado;
		delete req.query.carreras_grado;
		Universidad.find(req.query).find({ carreras_grado: { $elemMatch: { nombre_carrera: carrera } } }).exec((err, universidades) => {
			if (err) {
				res.status(404).json(err);
			}
			else {
				res.status(200).json(universidades);
			}
		});
	}
	else {
		Universidad.find(req.query).exec((err, universidades) => {
			if (err) {
				res.status(404).json(err);
			}
			else {
				res.status(200).json(universidades);
			}
		});
	}
}

const getUniversidad = function (req, res) {
	Universidad.findById(req.params.uniID).exec((err, universidades) => {
		if (err) {
			res.status(404).json(err);
		}
		else {
			res.status(200).json(universidades);
		}
	})
}

const getCarreras = function (req, res) {
	Universidad.find({ carreras_grado: { $elemMatch: { nombre_carrera: req.params.carrera } } }).exec((err, universidades) => {
		if (err) {
			res.status(404).json(err);
		}
		else {
			res.status(200).json(universidades);
		}
	})
}

module.exports = {
	getUniversidades, getUniversidad, getCarreras
};