
var universidades;

$(function() {
    $.get("./data/universidades.json", function(data, status) {
        console.log(data);
        //pedido = recuperarPedido();
        //universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
        //mostrarPizzas(ordenarPizzas(data));
        //actualizarTotal(computarTotal());
    });
});