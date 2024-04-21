
var mapa = '';
var arrayCasillas = []; // guardar objetos casillas
var arrayEnemigos = []; // guardar objetos enemigos
var casillaActual = '';
var filas = 0;
var columnas = 0;
var alto_casilla = 0;
var ancho_casilla = 0;
var personaje_img = '';
var contenedor_mapa = document.getElementById('contenedor-mapa');
var img_personaje = 'tanuki';
var contador_niveles = 1;
var mostrar_nivel = document.getElementById('mostrar-nivel');
var ronda = 1;
var contador_niveles_absolutos = 1;
var client_width = 0;
let moverEnemigo; // guarda el setTimeout de movimiento enemigo
let movimientoContinuo; // para mover el enemigo continuamente
let borrar_timeout_enemigos = false;
let controlador_columna_enemigo = 0;
var sumar_monedas = 0;
var mostrar_monedas = document.getElementById('mostrar-monedas');
var moneda = 0;
var sumar_monedas_absolutas = 0;
var contadorvidas = 3;
const bg1 = new Audio('../recursos/sounds/ost1.mp3'); // cargar sonidos
const bg2 = new Audio('../recursos/sounds/ost2.mp3');
const click_audio = new Audio('../recursos/sounds/click.mp3');
const ballon = new Audio('../recursos/sounds/ballon.mp3');
bg1.currentTime = 13.1;
ballon.currentTime = 0.4;
var activo = true;

document.addEventListener('DOMContentLoaded', function () {
    pintarCuadros();
});
// evento recargar la página
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

function pintarCuadros() {

    img_personaje = JSON.parse(localStorage.getItem('guardado'))["personaje"];
    personaje = new Personaje(null, true, 3, "standing", `../recursos/${img_personaje}.gif`, 0); //crear personaje

    if (contador_niveles > 5) {
        ronda++;
        contador_niveles = 1;
    }
    mostrar_nivel.innerHTML = contador_niveles_absolutos; // mostrar nivel actual en el mapa

    mapa = new Mapa(0, 0, 0, 0, contador_niveles, "bosque"); //crea objeto mapa
    enemigo = new Enemigo("casilla_2_1", 1, "imagen_src", 10);

    let results = mapa.colocarMapa(); //coloca el mapa y guarda los valores de filas y col y dimensiones
    arrayCasillas = results["arrayCasillas"]; //guarda los objetos casilla en un array asociativo donde cada casilla se llama con el formato "casilla_0_0" 
    filas = results["filas"];
    columnas = results["columnas"];
    ancho_casilla = results["ancho_casilla"];
    alto_casilla = results["alto_columnas"];

    mapa.filas = filas;
    mapa.columnas = columnas;
    mapa.ancho_casilla = ancho_casilla;
    mapa.alto_casilla = alto_casilla;

    personaje.casillaInicio(mapa, arrayCasillas); //seleccionar casilla de mitad de la 1era fila como inicio



    enemigo.cargarEnemigos(mapa, arrayCasillas); // cargar enemigos


    mostrar_monedas.innerHTML = Utilidades.datosGuardados()["monedas"]; // cargar monedas

}

/* Añadir eventos con teclas */
var movimiento = false;
document.addEventListener('keyup', (event) => {
    if (movimiento == false) {

        movimiento = true;

        if (event.key == ' ' || event.key == 's' || event.key == 'ArrowDown') {
            event.preventDefault();
            personaje.saltar('del');
        } else if (event.key == 'a' || event.key == 'ArrowLeft') {
            event.preventDefault();
            personaje.saltar('izq');
        } else if (event.key == 'd' || event.key == 'ArrowRight') {
            event.preventDefault();
            personaje.saltar('drch');
        } else if (event.key == 'w' || event.key == 'ArrowUp') {
            event.preventDefault();
            personaje.saltar('arrb');
        } else if (event.key == 'c') {
            if (img_personaje == 'tanuki') {
                img_personaje = 'jerbo';
            } else if (img_personaje == 'jerbo') {
                img_personaje = 'tanuki';
            }
            mapa.nuevoMapa();
        }

        setTimeout(() => {
            movimiento = false;
        }, 180);
    }


});

document.addEventListener('keydown', (e) => {
    Utilidades.bg();
});
document.addEventListener('mousedown', (e) => {
    Utilidades.bg();
});

contenedor_mapa.addEventListener('wheel', (event) => {
    event.preventDefault();
});

// función para innerHTML DE numerovidas CORAZONEs
function corazones() {
    var corazones = document.getElementById("corazones")
    corazones.innerHTML = '';
    for (var i = 0; i < contadorvidas; i++) {
        corazones.innerHTML += '<img src="../recursos/corazon.png" alt="contador vidas una vida">';
    }
}
corazones();