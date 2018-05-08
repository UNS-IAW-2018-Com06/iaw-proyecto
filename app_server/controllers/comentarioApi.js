const mongoose = require('mongoose');
const Universidad = mongoose.model('Universidad');


const setComentario = function(req,res){

    var foto;
    if(req.user.photos == null){
        foto = "";
    }
    else{
        foto = req.user.photos[0].value;
    }

    Universidad.update({_id: req.body.id},{ "$push": { "comentarios": { "usuario" :  req.user.displayName, "foto" : req.user.foto, "comentario" : req.body.comentario}}},
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