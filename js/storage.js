function guardarEstilo(estilo) {
    localStorage.estilo = JSON.stringify(Array.from(estilo.values()));
}

function recuperarEstilo() {
    var result = localStorage.estilo;
    return (result != undefined) ? new Set(JSON.parse(result)) : new Set();
}