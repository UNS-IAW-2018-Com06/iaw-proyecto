
var universidades;
//var estilo;

$(function() {
    $.get("./data/universidades.json", function(data, status) {
        console.log(data);
       // estilo = recuperarEstilo();
        universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
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

function getId(universidad) {
    return universidad.nombre.replace(/\s/g, '');
}

function agregarUniversidad(id,universidad){
    var row = $("<tr></tr>").attr("id", id);
    row.append($("<td></td").text(universidad.nombre));
    console.log(universidad.nombre);
    $("#tabla").append(row);
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
