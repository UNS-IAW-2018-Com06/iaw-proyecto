function mostrarInfoUniversidad(universidad) {
    mostrarDatosUniversidad(universidad);
    mostrarCarrerasUniversidad(universidad);
    mostrarComentariosUniversidad(universidad);
}

function mostrarDatosUniversidad(universidad) {
    $("#info").empty();
    $("#info").append("<h1>" + universidad.nombre + "</h1>");
    $("#info").append("<p><b>Provincia : </b>" + universidad.provincia + "</p>");
    $("#info").append("<p><b>Ciudad : </b>" + universidad.ciudad + "</p>");
    $("#info").append("<p><b>Pagina Web : </b><a href=" + universidad.web + ">" + universidad.web + "</a></p>");
}

function mostrarCarrerasUniversidad(universidad) {
    $("#info").append("<table class=\"table carreras\" id=\"tabla-carreras\">" +
        "<thead>" +
        "<tr>" +
        "<th> Carrera </th>" +
        "<th> Duracion </th>" +
        "</tr>" +
        "</thead>" +
        "<tbody> </tbody></table>");
    for (var i in universidad.carreras_grado) {
        $("#tabla-carreras > tbody:last-child").append("<tr>" + "<td>" + universidad.carreras_grado[i].nombre_carrera + "</td>" +
            "<td>" + universidad.carreras_grado[i].duración + "</td>" + "</tr>");
    }
}

function mostrarComentariosUniversidad(universidad) {
    var lista = recuperarComentarios(getId(universidad));
    $("#comentario").empty();
    $("#comentario").append("<h1> Comentarios </h1>");
    $("#comentario").append("<table class=\"table comentarios\" id=\"tabla-comentarios\">" +
        "<tbody> </tbody></table>");
    for (var i in lista) {
        $("#tabla-comentarios > tbody:last-child").append("<tr>" + "<td>" + lista[i] + "</td>" + "</tr>");
    }
    $("#comentario").append("<div class=\"form-group\">"
        + "<label for=\"comment\">Deja tu comentario:</label>"
        + "<textarea class=\"form-control\"  id=\"comment\"></textarea>"
        + "<button onclick=\"agregarComentario()\" type=\"button\" class=\"btn btn-primary botonEnviar\">Enviar Comentario</button>"
        + "</div>");
}