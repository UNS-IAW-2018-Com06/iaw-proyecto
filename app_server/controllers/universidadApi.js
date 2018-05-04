const mongoose = require('mongoose');
const Universidad = mongoose.model('Universidad');

const getUniversidades = function (req, res) {
	Universidad
		.find()
		.exec((err, universidades) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(universidades);
			}
		})
}

//lucho puto

module.exports = {
	getUniversidades
};