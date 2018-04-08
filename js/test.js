
var universidades;
var map;
//var estilo;

$(function() {
    $.get("./data/universidades.json", function(data, status) {
        
        initMap();
       // estilo = recuperarEstilo();
        universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
        mostrarUniversidades(data);
        
    });
});


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat : -37.0560032, lng: -65.9002859}
    }); 
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': 'Argentina'}, function(results, status) {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);
          
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
}

function mostrarUniversidades(data){
    var index;

    $.each(data, function(index,universidad){
        //var id = getId(universidad);
        //agregarUniversidad(id,universidad);
        agregarUniversidadMapa(universidad);
    })
} 

function agregarUniversidadMapa(universidad){

   
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(universidad.coordenadas[0], universidad.coordenadas[1]),
        map: map
    });
    marker.addListener('click', function() {
        agregarUniversidad(getId(universidad),universidad);
      });
}

function getId(universidad) {
    return universidad.nombre.replace(/\s/g, '');
}

function agregarUniversidad(id,universidad){
    //var row = $("<tr></tr>").attr("id", id);
    //row.append($("<td></td").text(universidad.nombre));
    console.log(universidad.nombre);
    $("#info").empty();
    $("#info").append("<h1>"+universidad.nombre+"</h1>");
    $("#info").append("<h2>"+universidad.provincia+"</h2>");
    $("#info").append("<h2>"+universidad.ciudad+"</h2>");
    $("#info").append("<h2>"+universidad.web+"</h2>");
}

/*function onActualizarEstilo(e) {
    var id = $(e.target).parents("tr").attr("id");

    //le cambio el estado
    actualizarEstado(id, actualizarEstilo(id));

    guardarEstilo(estilo);
}
*/
/*function actualizarEstilo(id) {
    var enPedido = !pedido.has(id);
    if (enPedido) {
        pedido.add(id);
    } else {
        pedido.delete(id);
    }
    return enPedido;
}
*/
