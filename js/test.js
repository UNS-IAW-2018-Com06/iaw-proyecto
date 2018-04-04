
var universidades;

$(function() {
    $.get("./data/universidades.json", function(data, status) {
        console.log(data);
        //universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
        mostrarUniversidades(data);
    });
});

function mostrarUniversidades(data){
    var index;

    $.each(data, function(index,universidad){
        var id = getId(universidad);
        agregarUniversidad(id,universidad);
    })
} 

function agregarUniversidad(id,universidad){
    var row = $("<tr></tr>").attr("id", id);
    row.append($("<td></td").text(universidad.nombre));
    console.log(universidad.nombre);
    $("#tabla").append(row);
}
