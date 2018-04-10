var universidades;
var universidadSeleccionada;
var map;

$(function () {
    $.get("./data/universidades.json", function (data, status) {
        map = initMap();
        var estilo = recuperarEstilo();
        setEstilo(estilo);
        universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
        obtenerUniversidades(data);

    });
});

function getId(universidad) {
    return universidad.nombre.replace(/\s/g, '');
}

function obtenerUniversidades(data) {
    var index;
    $.each(data, function (index, universidad) {
        agregarUniversidadEnMapa(universidad);
    })
}

function agregarUniversidadEnMapa(universidad) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(universidad.coordenadas[0], universidad.coordenadas[1]),
        map: map
    });
    marker.addListener('click', function () {
        agregarUniversidad(universidad);
        universidadSeleccionada = universidad;
        $("#search").attr("placeholder", universidad.nombre).blur();
        map.setCenter(marker.position);
        map.setZoom(15);
    });
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

