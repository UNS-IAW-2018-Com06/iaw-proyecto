
const comentarioItemTemplate = Twig.twig({
    href: "/shared/ComentarioItem.twig", async: false
});

const comentarioTemplate = Twig.twig({
    href: "/shared/Comentario.twig", async: false
});

function mostrarInfoUniversidad(universidad) {
    mostrarCarrerasUniversidad(universidad);
    mostrarComentariosUniversidad(universidad);
}

function mostrarCarrerasUniversidad(universidad) {
    for (var i in universidad.carreras_grado) {
        $("#tabla-carreras").append("<tr>" + "<td>" + universidad.carreras_grado[i].nombre_carrera + "</td>" +
            "<td>" + universidad.carreras_grado[i].duración + "</td>" + "</tr>");
    }
}

function mostrarComentariosUniversidad(universidad) {
    $("#comentario").append(comentarioTemplate.render());
    for (var i in universidad.comentarios) {
        agregarComentarioUniversidad(universidad.comentarios[i]);
    }
}

function agregarComentarioUniversidad(comentario) {
    var row = $(comentarioItemTemplate.render({ "comentario": comentario }));
    $("#tabla-comentarios").append(row);

}