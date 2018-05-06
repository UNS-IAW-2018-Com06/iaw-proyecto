function guardarComentario(comentario) {
    const jsonString = JSON.stringify(Array.from(comentario.values()));
    $.ajax({
        url: './api/comentario',
        type: 'POST',
        data: JSON.stringify({ comentario: JSON.parse(jsonString) }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            callback((data != undefined) ? new Set(data) : new Set());
        },
        error: function (data) {
            window.localStorage.setItem("pedido", jsonString);
        }
    });
}

function recuperarComentarios(callback) {
    $.ajax({
        url: './api/comentario',
        type: 'GET',
        success: function (data) {
            callback((data != undefined) ? new Set(data) : new Set());
        },
        error: function (data) {
            var result = window.localStorage.getItem("pedido");
            callback((result != undefined) ? new Set(JSON.parse(result)) : new Set());
        }
    });
}