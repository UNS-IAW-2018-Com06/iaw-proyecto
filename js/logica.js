var universidades;
var universidadSeleccionada;

$(function () {
    $.get("./data/universidades.json", function (data, status) {
        initMap();
        var estilo = recuperarEstilo();
        setEstilo(estilo);
        var universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
        obtenerUniversidades(data);

    });
});

function getId(universidad) {
    return universidad.nombre.replace(/\s/g, '');
}

function obtenerUniversidades(data) {
    var index;
    $("#info").empty();
    $("#info").append("<h1>Universidades Nacionales Argentinas</h1>");
    $("#info").append("<table class=\"table table-hover universidades\" id=\"tabla-universidades\">" +
        "<tbody> </tbody></table>");

    $.each(data, function (index, universidad) {
        $("#tabla-universidades > tbody:last-child").append("<tr class=\"clickable-row\">" + "<td>" + universidad.nombre + "</td>" + "</tr>");
        agregarUniversidadEnMapa(universidad);
    })
}

function agregarComentario(id) {
    guardarComentario(getId(universidadSeleccionada), $('#comment').val());
    mostrarComentarios(universidadSeleccionada);
}

function agregarUniversidad(universidad) {
    mostrarDatos(universidad);
    mostrarCarreras(universidad);
    mostrarComentarios(universidad);
}

function mostrarDatos(universidad) {
    $("#info").empty();
    $("#info").append("<h1>" + universidad.nombre + "</h1>");
    $("#info").append("<p><b>Provincia : </b>" + universidad.provincia + "</p>");
    $("#info").append("<p><b>Ciudad : </b>" + universidad.ciudad + "</p>");
    $("#info").append("<p><b>Pagina Web : </b><a href=" + universidad.web + ">" + universidad.web + "</a></p>");
}

function mostrarCarreras(universidad) {
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

function mostrarComentarios(universidad) {
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

function mostrarFiltros() {
    $("#filtro").append("<div class=\"col-md-4\"> " +
        +" <span class= \"label label-default\" > Provincias : </span >"
        + " <select class=\"custom-select\">"
        + " <option selected>Todas</option>"
        + " </select>"
        + " </div >"
        + " <div class=\"col-md-4\">"
        + "    <span class=\"label label-default\">Ciudad : </span>"
        + "    <select class=\"custom-select\">"
        + "        <option selected>Todas</option>"
        + " </select>"
        + "</div>"
        + "<div class=\"col-md-4\">"
        + "    <span class=\"label label-default\">Carrera : </span>"
        + "    <select class=\"custom-select\">"
        + "        <option selected>Todas</option>"
        + " </select>"
        + "</div>");
}

