
var universidades;
var map;
var estilo;

$(function () {
    $.get("./data/universidades.json", function (data, status) {
        initMap();
        estilo = recuperarEstilo();
        setEstilo(estilo);
        universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
        mostrarUniversidades(data);

    });
});

function setEstilo(estilo) {
    if (estilo == "true") {
        $('#toggle-box-checkbox').prop("checked", estilo).trigger("change");
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: -37.0560032, lng: -65.9002859 }
    });
}

function mostrarUniversidades(data) {
    var index;
    $.each(data, function (index, universidad) {
        agregarUniversidadMapa(universidad);
    })
}

function agregarUniversidadMapa(universidad) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(universidad.coordenadas[0], universidad.coordenadas[1]),
        map: map
    });
    marker.addListener('click', function () {
        agregarUniversidad(getId(universidad), universidad);
        $("#search").attr("placeholder", universidad.nombre).blur();
        map.setCenter(marker.position);
        map.setZoom(15);
    });
}

function getId(universidad) {
    return universidad.nombre.replace(/\s/g, '');
}

function agregarUniversidad(id, universidad) {
   $("#info").empty();
    $("#info").append("<h1>" + universidad.nombre + "</h1>");
    $("#info").append("<p><b>Provincia : </b>" + universidad.provincia + "</p>");
    $("#info").append("<p><b>Ciudad : </b>" + universidad.ciudad + "</p>");
    $("#info").append("<p><b>Pagina Web : </b><a href=" + universidad.web + ">"+universidad.web+"</a></p>");
  
    $("#info").append("<table class=\"table carreras\" id=\"tabla-carreras\">"+
                      "<thead>"+
                            "<tr>"+
                                "<th> Carrera </th>"+
                                "<th> Duracion </th>"+
                             "</tr>"+
                      "</thead>"+
                      "<tbody> </tbody></table>");
    for(var i in universidad.carreras_grado){
      $("#tabla-carreras > tbody:last-child").append("<tr>"+ "<td>"+ universidad.carreras_grado[i].nombre_carrera +"</td>"+
                                "<td>"+ universidad.carreras_grado[i].duración +"</td>"+"</tr>");              
    }

    $("#comentario").empty();
    $("#comentario").append("<div class=\"form-group\">"
                            +"<label for=\"comment\">Comentario:</label>"
                            +"<textarea class=\"form-control\" rows=\"5\" id=\"comment\"></textarea>"
                            +"</div>");
                            
}