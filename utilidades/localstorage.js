
// inicializar localstorage si no existe
if (localStorage.getItem('guardado') == null || localStorage.getItem('guardado') == 'undefined') {
    console.log("nullllllllllllllllllllllllllllll");
    var guardado = {
        "monedas": 0,
        "personaje": "jerbo",
        "p2": false,
        "p3": false,
        "nivel_max": 0,
        "niveles_superados": 0,
        "muertes_totales": 0
    }
    localStorage.setItem('guardado', JSON.stringify(guardado));
}

// prueba
var registro = JSON.parse(localStorage.getItem('guardado')); 
console.log(registro["monedas"]);
