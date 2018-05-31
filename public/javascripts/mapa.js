var map;

function agregarUniversidadEnMapa(universidad) {

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(universidad.coordenadas[0], universidad.coordenadas[1]),
        map: map,
        id : universidad._id
    });
    marker.addListener('click', function () {
        $("#"+marker.id).children().trigger('click');
        
    });
}

function centrarUniversidad(lt, lg){

    map.panTo({lat: lt, lng : lg});
    map.setZoom(15);
}

function Volver(controlDiv) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '5px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click para volver';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.lineHeight = '30px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Volver';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        map.setCenter({ lat: -37.0560032, lng: -65.9002859 });
        map.setZoom(4);
        $("#comentario").empty();
        $("#info-universidad").empty();
        $("#lista-universidades").show();
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: -37.0560032, lng: -65.9002859 },
        fullscreenControl: false
    });

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new Volver(centerControlDiv);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}