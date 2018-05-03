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

function setEstilo(estilo) {
    if (estilo == "true") {
        $('#toggle-box-checkbox').prop("checked", estilo).trigger("change");
    }
}


