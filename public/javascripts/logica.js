var marcadores;
var universidades
var universidadSeleccionada;

$(function () {
    $.get("./api/universidades", function (data, status) {
        initMap();
        var estilo = recuperarEstilo();
        setEstilo(estilo);
        universidades = data;
        marcadores = new Map();
        mostrarUniversidades();
    });
});

function getId(universidad) {
    return universidad.nombre.replace(/\s/g, '');
}

function mostrarUniversidades() {
    var index;
    $("#comentario").empty();
    $("#info").empty();
    $("#info").append("<h1>Universidades Nacionales Argentinas</h1>");
    $("#info").append("<table class=\"table table-hover universidades\" id=\"tabla-universidades\">" +
        "<tbody> </tbody></table>");

    $.each(universidades, function(index, universidad){
        $("#tabla-universidades > tbody:last-child").append("<tr class=\"clickable-row\">" + "<td>" + universidad.nombre + "</td>" + "</tr>");
        agregarUniversidadEnMapa(universidad);
    })

    $(document).ready(function($) {
        $("#tabla-universidades tr").click(function(e) {
            $.each(universidades, function(index, universidad){
                if(universidad.nombre == e.target.innerHTML){
                    google.maps.event.trigger(marcadores.get(getId(universidad)),'click',{});
                }
            })
        });
    });
}

function agregarComentario(id) {
    guardarComentario(getId(universidadSeleccionada), $('#comment').val());
    mostrarComentarios(universidadSeleccionada);
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
