function guardarEstilo(checkbox) {
   localStorage.checkbox = JSON.stringify(checkbox);
}


function recuperarEstilo() {
    var result = localStorage.checkbox;
    if(result == undefined){
        return false;
    }
    else{
        return result; 
    }
}
