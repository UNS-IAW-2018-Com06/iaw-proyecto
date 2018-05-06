const mongoose = require('mongoose');
const Universidad = mongoose.model('Universidad');


const setComentario = function(req,res){
    Universidad.update({_id: req.universidad._id},{comentarios : req.body.comentario},
        {upsert: true, setDefaultsOnInsert: true}, (err, comentario) => {
            if (err) { 
                res
                    .status(400)
                    .json(err);    
            } else {
                res
                    .status(201)
                    .json(comentario);
            }
        })
}

module.exports = {
	setComentario
};