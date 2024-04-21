
class Utilidades {

    contructor() {
    }

    static numeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    // guardar monedas al actualizar número en localstorage
    static guardar(monedas) {
        var getLocalStorage = JSON.parse(localStorage.getItem('guardado'));
        console.log(getLocalStorage, 'getlaodkeikgfnrngviru');
        var guardado = {
            "monedas": monedas,
            "personaje": getLocalStorage["personaje"],
            "p2": getLocalStorage["p2"],
            "p2": getLocalStorage["p3"],
            "nivel_max": getLocalStorage["nivel_max"],
            "niveles_superados": getLocalStorage["niveles_superados"],
            "muertes_totales": getLocalStorage["muertes_totales"]
        }
        localStorage.setItem('guardado', JSON.stringify(guardado));
        console.log(JSON.parse(localStorage.getItem('guardado')));
    }

    // leer datos de monedas de localstorage
    static datosGuardados() {
        return JSON.parse(localStorage.getItem('guardado'));
    }

    // sonidos
    static bg() {
        if (bg1.paused) bg1.play();
        bg1.volume = 1;
        bg1.addEventListener('ended', function () {
            if (bg2.paused) bg2.play();
        });
        bg2.addEventListener('ended', function () {
            if (bg1.paused) bg1.play();
        });
    }


}

