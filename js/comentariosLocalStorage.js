function recuperarComentarios() {
    var comentariosDeUniversidad = localStorage.comentario;
    if(comentariosDeUniversidad == undefined){
        return "";
    }
    else{
        return comentariosDeUniversidad; 
    }
}

function guardarComentario(comentario) {
   localStorage.comentario = JSON.stringify(comentario);
}
