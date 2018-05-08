const mongoose = require('mongoose');
const Universidad = mongoose.model('Universidad');


const setComentario = function(req,res){
    console.log("ID: "+req.body.id);
    console.log("COMENTARIO: "+req.body.comentario);
    console.log("USUARIO: "+ req.user.username);

    Universidad.update({_id: req.body.id},{ "$push": { "comentarios": { "usuario" :  req.user.displayName, "comentario" : req.body.comentario}}},
        {upsert: true, setDefaultsOnInsert: true}, (err, comentario) => {
            if (err) { 
                res
                    .status(400)
                    .json(err);    
            } else {
                console.log("Comentario Agregado");
                res.redirect("/api/universidad/"+ req.body.id);
            }
        })
        
}

module.exports = {
	setComentario
};