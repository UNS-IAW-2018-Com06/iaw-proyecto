function guardarComentario() {
    const uniID = $('#info-universidad').children().attr('id');
    const coment = $('#comment').val();
    if (coment != '') {
        $.ajax({
            url: './api/universidad/' + uniID + '/comentar',
            type: 'POST',
            data: JSON.stringify({ id: uniID, comentario: coment }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                $('#comment').val('');
                agregarComentarioUniversidad(data.comentarios[data.comentarios.length - 1]);
            },
            error: function (data) {
                $(location).attr("href", '/login');
            }
        });
    }
}