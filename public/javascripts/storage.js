function guardarComentario() {
    const uniID  = $('#info-universidad').children().attr('id');
    const coment = $('#comment').val();
    $.ajax({
        url: './api/universidad/'+uniID+'/comentar',
        type: 'POST',
        data: JSON.stringify({id: uniID, comentario : coment}),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            callback((data != undefined) ? new Set(data) : new Set());
        },
        error: function (data) {
            console.log("error");
        }
    });
}