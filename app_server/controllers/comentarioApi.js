const mongoose = require('mongoose');
const Universidad = mongoose.model('Universidad');


const setComentario = function(req,res){

    var foto;
    if(req.user.photos == null){
        foto = "/images/foto.jpg";
    }
    else{
        foto = req.user.photos[0].value;
    }

    Universidad.update({_id: req.body.id},{ "$push": { "comentarios": { "usuario" :  req.user.displayName, "foto" : foto, "comentario" : req.body.comentario}}},
        {upsert: true, setDefaultsOnInsert: true}, (err, comentario) => {
            if (err) { 
                res
                    .status(400)
                    .json(err);    
            } else {
                res.redirect('/api/universidad/'+req.body.id);
            }
        })
        
}

module.exports = {
	setComentario
};