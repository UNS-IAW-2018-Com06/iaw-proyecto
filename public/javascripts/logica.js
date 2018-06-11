
const univerisdadItemTemplate = Twig.twig({
    href: "/shared/UniversidadesItem.twig", async: false
});

const universidadInfoTemplate = Twig.twig({
    href: "shared/InfoUniversidad.twig", async: false
});

var carreras = new Set();
var provCiud = new Map();
var filterProvincia = 'Todas';
var filterCarrera = 'Todas';
var filterCiudad = 'Todas';

$(function () {

    $.get("./api/universidad/", function (data, status) {
        initMap();
        var estilo = recuperarEstilo();
        setEstilo(estilo);
        mostrarUniversidades(data);
        initFilters(data);
    });
    FiltrarPorBusqueda();
});

function initFilters(data) {
    $.each(data, function (index, universidad) {

        ciudades = provCiud.get(universidad.provincia)
        if (ciudades) {
            ciudades.add(universidad.ciudad);
        }
        else {
            ciudades = new Set();
            ciudades.add(universidad.ciudad);
            provCiud.set(universidad.provincia, ciudades);
        }
        for (var i in universidad.carreras_grado) {
            carreras.add(universidad.carreras_grado[i].nombre_carrera);
            // console.log(universidad.carreras_grado[i]);
        }
    })

    $("#listaCiudades").attr('disabled', true);

    for (let provincia of provCiud.keys()) {
        $('#listaProvincias').append('<option>' + provincia + '</option>');
    }

    for (let carrera of carreras.entries()) {
        $('#listaCarreras').append('<option>' + carrera[0] + '</option>');
    }

    $('#listaProvincias').on('change', function () {

        filterProvincia = $('#listaProvincias option:selected').text();
        applyFilters()
    });

    $('#listaCiudades').on('change', function () {

        filterCiudad = $('#listaCiudades option:selected').text();
        applyFilters();
    });

    $('#listaCarreras').on('change', function () {

        filterCarrera = $('#listaCarreras option:selected').text();
        applyFilters();
    });
}

function applyFilters() {

    var filtro = '';

    if (filterProvincia != 'Todas') {   // No tengo que buscar por provincia ni por ciudad
        $("#listaCiudades").removeAttr('disabled');

        $('#listaCiudades').find('option').remove();
        $('#listaCiudades').append('<option value=\'all\'>Todas</option>');
        for (let ciudad of provCiud.get(filterProvincia)) {
            $('#listaCiudades').append('<option>' + ciudad + '</option>');
        }
        filtro = filtro + '?provincia=' + filterProvincia;

        if (filterCiudad != 'Todas') {
            filtro = filtro + '&ciudad=' + filterCiudad;
        }
        if (filterCarrera != 'Todas') {  //No tengo que buscar con nada
            filtro = filtro + '&carreras_grado=' + filterCarrera;
        }

    } else {
        $("#listaCiudades").attr('disabled', true);

        if (filterCarrera != 'Todas') {  //No tengo que buscar con nada
            filtro = filtro + '?carreras_grado=' + filterCarrera;
        }
    }

    $.get('./api/universidad/' + filtro, function (data, status) {
        mostrarUniversidades(data);
    });
}

function mostrarUniversidades(data) {

    $("#tabla-universidades tr").remove();
    borrarMarcadores();
    carreras.clear();
    $.each(data, function (index, universidad) {

        ciudades = provCiud.get(universidad.provincia)
        if (ciudades) {
            ciudades.add(universidad.ciudad);
        }
        else {
            ciudades = new Set();
            ciudades.add(universidad.ciudad);
            provCiud.set(universidad.provincia, ciudades);
        }
        for (var i in universidad.carreras_grado) {
            carreras.add(universidad.carreras_grado[i].nombre_carrera);
            // console.log(universidad.carreras_grado[i]);
        }

        var row = $(univerisdadItemTemplate.render({ "universidad": universidad })).attr("id", universidad._id);
        row.click(mostrarUniversidad);
        $("#tabla-universidades").append(row);
        agregarUniversidadEnMapa(universidad);
    });

    $('#listaCarreras').find('option').remove();
    $('#listaCarreras').append('<option value=\'all\'>Todas</option>');
    for (let carrera of carreras.entries()) {
        $('#listaCarreras').append('<option>' + carrera[0] + '</option>');
    }
}

function mostrarUniversidad(e) {

    var id = $(e.target).parents("tr").attr("id");

    $('#filtros').hide();
    $('#filter-btn').hide();
    $('#lista-universidades').hide();
    $.get("./api/universidad/" + id, function (data, status) {
        
        getRating(data);       
        mostrarInfoUniversidad(data);
        centrarUniversidad(data.coordenadas[0], data.coordenadas[1])
    });
}

function mostrarFiltros() {
    $("#filtros").toggle();
}

function FiltrarPorBusqueda() {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tabla-universidades tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

