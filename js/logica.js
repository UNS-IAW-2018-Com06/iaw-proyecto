
var map;

$(function () {
    $.get("./data/universidades.json", function (data, status) {
        map=initMap();
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
        agregarUniversidad( universidad);
        $("#search").attr("placeholder", universidad.nombre).blur();
        map.setCenter(marker.position);
        map.setZoom(15);
    });
}


function agregarUniversidad( universidad) {
    mostrarDatos(universidad);
    mostrarCarreras(universidad);
    mostrarComentarios();
}
  
function mostrarDatos(universidad){
    $("#info").empty();
    $("#info").append("<h1>" + universidad.nombre + "</h1>");
    $("#info").append("<p><b>Provincia : </b>" + universidad.provincia + "</p>");
    $("#info").append("<p><b>Ciudad : </b>" + universidad.ciudad + "</p>");
    $("#info").append("<p><b>Pagina Web : </b><a href=" + universidad.web + ">"+universidad.web+"</a></p>");
}
 function mostrarCarreras(universidad){
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
 }

function mostrarComentarios(){
    $("#comentario").empty();
    $("#comentario").append("<div class=\"form-group\">"
                            +"<label for=\"comment\">Comentario:</label>"
                            +"<textarea class=\"form-control\" rows=\"5\" id=\"comment\"></textarea>"
                            +"</div>");
}
                            
