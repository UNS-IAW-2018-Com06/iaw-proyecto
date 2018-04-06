function guardarEstilo(estilo) {
    window.localStorage.setItem("estilo", JSON.stringify(Array.from(estilo.values())));
}


function recuperarEstilo() {
    var result = window.localStorage.getItem("estilo");
    return (result != undefined) ? new Set(JSON.parse(result)) : new Set();
}
