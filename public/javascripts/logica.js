
const univerisdadItemTemplate = Twig.twig({
    href: "/shared/UniversidadesItem.twig", async: false
});

const universidadInfoTemplate = Twig.twig({
    href: "shared/InfoUniversidad.twig", async :false
});



$(function () {
    $.get("./api/universidad/all", function (data, status) {
        initMap();
        var estilo = recuperarEstilo();
        setEstilo(estilo);
        mostrarUniversidades(data);
        $("#filtros").hide();
    });
    
});

function mostrarUniversidades(data) {
    $.each(data, function (index, universidad) {
        var row = $(univerisdadItemTemplate.render({ "universidad": universidad })).attr("id", universidad._id);
        row.click(mostrarUniversidad);
        $("#tabla-universidades").append(row);
        agregarUniversidadEnMapa(universidad);
    })
}

function mostrarUniversidad(e) {
    
    var id = $(e.target).parents("tr").attr("id");

    $("#lista-universidades").hide();
    $.get("./api/universidad/" + id, function (data, status) {
        $("#info-universidad").append($(universidadInfoTemplate.render({ "universidad": data })).attr("id",data._id));
        mostrarInfoUniversidad(data);
        centrarUniversidad(data.coordenadas[0],data.coordenadas[1])
    });
}

function mostrarFiltros(){
    $("#filtros").toggle();

}

