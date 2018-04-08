function guardarEstilo(checkbox) {
   localStorage.checkbox = JSON.stringify(checkbox);
}


function recuperarEstilo() {
    console.log(localStorage.checkbox);
    var result = localStorage.checkbox;
    if(result == undefined){
        return false;
    }
    else{
        return result; 
    }
}
