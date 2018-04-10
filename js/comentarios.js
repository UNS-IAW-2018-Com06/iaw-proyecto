function guardarComentario(id,comentario) {
    var lista = JSON.parse(localStorage.getItem(id));
    console.log(lista);
    lista.push(comentario);
    console.log(lista);
    localStorage.setItem(id,JSON.stringify(lista));
 }
 
 
 function recuperarComentarios(id) {
     var lista = JSON.parse(localStorage.getItem(id));
     if(lista){
         return lista;
     }
     else{
         var lista = [];
         localStorage.setItem(id,JSON.stringify(lista));
         return lista;
     }
 }