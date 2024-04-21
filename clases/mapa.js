class Mapa {
    constructor(filas, columnas, ancho_casilla, alto_casilla, n_nivel, tipo_nivel) {
        this.filas = filas;
        this.columnas = columnas;
        this.ancho_casilla = ancho_casilla;
        this.alto_casilla = alto_casilla;
        this.n_nivel = n_nivel;
        this.tipo_nivel = tipo_nivel;
    }

    colocarMapa() {

        var contenedor_mapa = document.getElementById('contenedor-mapa');
        contenedor_mapa.innerHTML = '';
        var border = 2;
        client_width = window.innerWidth; //para hacer que las dimensiones dependan de la pantalla del cliente
        var client_height = window.innerHeight;
        var fi = 9;
        var co = 9;
        var an = (1 / fi * (client_width - fi * (2 * border))) / client_width * 100; // 1fila / filas totales * 100 - ajuste
        var al = an;
        // var an = document.getElementById('ancho').value;
        // var al = document.getElementById('alto').value;
        // var co = document.getElementById('columna').value;
        // var fi = document.getElementById('fila').value;
        let arrayTexturasFilas = mapa.addTexturas(fi);
        let arrayTexturas = arrayTexturasFilas[0];
        let arrayFilasSeguras = arrayTexturasFilas[1];
        // console.log("array filas seguras", arrayFilasSeguras);
        // console.log("array texturas", arrayTexturas);

        var arrayCasillas = {};
        for (var a = 0; a < fi; a++) {
            var direccion_fila = mapa.direccionAzar(); // cada fila direccion azar
            for (var b = 0; b < co; b++) {
                contenedor_mapa.innerHTML += `<div id="div_casilla_${a}_${b}"; style="width: ${an}%; aspect-ratio: 1/1; float: left; border: ${border}px solid rgba(1, 1, 1, 0.00); background: url('../recursos/${arrayTexturas[a]}.png'); background-size: contain;" ></div>`;

                arrayCasillas["casilla_" + a + "_" + b] = new Casilla("casilla_" + a + "_" + b, a, b, false, false, false, `${arrayTexturas[a]}.png`, direccion_fila, arrayFilasSeguras[a]);

            }
            contenedor_mapa.innerHTML += '<div style="clear:both"></div>';
        }



        return {
            "arrayCasillas": arrayCasillas,
            "filas": fi,
            "columnas": co,
            "alto_columnas": al,
            "ancho_casilla": an
        };
    }

    guardarNiveles() {
        return {
            "bosque": {
                "nivel": "bosque",
                "carretera": "carretera",
                "carretera_alt": "carretera2",
                "camino": "camino"
            },
            "desierto": {
                "nivel": "desierto",
                "carretera": "carretera",
                "carretera_alt": "carretera_desierto",
                "camino": "camino_desierto"
            },
            "tundra": {
                "nivel": "nieve",
                "carretera": "carretera",
                "carretera_alt": "carretera_hielo",
                "camino": "camino_hielo"
            },
            "montaña": {
                "nivel": "mountain",
                "carretera": "carretera",
                "carretera_alt": "carretera_mountain",
                "camino": "camino_mountain"
            },
            "fábrica": {
                "nivel": "fabrica",
                "carretera": "fabrica2",
                "carretera_alt": "fabrica2",
                "camino": "fabrica2"
            }
        }
    }

    addTexturas(filas) { // este es el array donde se guarda el orden de las filas generadas
        var niveles = this.guardarNiveles();
        var nivel_actual = '';
        var tres_carreteras = false; // no puede haber 3 carreteras seguidas, no confundirse porque en dos_carreteras se llama true a cuando ya ha habido 2 carr seguidas, aquí se llama true cuando puede haberlas
        if (this.n_nivel <= 1) { // comprobar que número de nivel es
            nivel_actual = niveles["bosque"];
        } else if (this.n_nivel <= 2) {
            nivel_actual = niveles["desierto"];
        } else if (this.n_nivel <= 3) {
            nivel_actual = niveles["tundra"];
        } else if (this.n_nivel <= 4) {
            nivel_actual = niveles["montaña"];
        } else if (this.n_nivel <= 5) {
            nivel_actual = niveles["fábrica"];
        }

        if (contador_niveles > 4) { // si es ronda mayor que 1 pueden aparecer más de 3 carreteras seguidas
            tres_carreteras = true; // puede haber 3
        }

        var arrayTexturas = []; // se guarda el orden aleatorio de carreteras y zonas seguras
        var arrayFilasSeguras = []; // se guarda si pueden aparecer enemigos o no
        if (filas % 2 == 1) {

            arrayTexturas[0] = nivel_actual["nivel"]; // 1era fila nieve
            arrayFilasSeguras[0] = true; // 1era fila segura
            arrayTexturas[filas - 1] = nivel_actual["nivel"]; // última fila nieve
            arrayFilasSeguras[filas - 1] = true; // úlitma fila segura

            var dos_carreteras = false; // controla si hay 2 carreteras seguidas (o 3)
            for (var i = 1; i < filas - 1; i++) { // para cada fila intermedia
                if (arrayTexturas[i - 1] == nivel_actual["nivel"]) { // si la textura anterior es nueve
                    var rand = Utilidades.numeroAleatorio(1, 2); // obtener si es textura de tipo 1 o 2
                    arrayFilasSeguras[i] = false; // carretera con enemigos
                    rand == 1 ? arrayTexturas[i] = nivel_actual["carretera"] : arrayTexturas[i] = nivel_actual["carretera_alt"];
                } else { // si la textura anterior no es nieve
                    var rand = Utilidades.numeroAleatorio(1, 2); // al azar si hay 2 carreteras seguidas  
                    if (rand == 1 && dos_carreteras == false) {
                        var alt = Utilidades.numeroAleatorio(1, 2); // texturas alternativas
                        arrayFilasSeguras[i] = false; // filas con enemigos
                        alt == 1 ? arrayTexturas[i] = nivel_actual["carretera"] : arrayTexturas[i] = nivel_actual["camino"];
                        dos_carreteras = true; // la siguiente no será carretera
                    } else if (dos_carreteras == true && tres_carreteras == true) {
                        var alt = Utilidades.numeroAleatorio(1, 2); // texturas alternativas
                        arrayFilasSeguras[i] = false; // filas con enemigos
                        alt == 1 ? arrayTexturas[i] = nivel_actual["carretera"] : arrayTexturas[i] = nivel_actual["camino"];
                        tres_carreteras = false;
                    } else {
                        arrayTexturas[i] = nivel_actual["nivel"];
                        arrayFilasSeguras[i] = true; // filas sin enemigos
                        dos_carreteras = false;
                        if (contador_niveles > 8) tres_carreteras = true; // para que puede haber 2 veces 3 carreteras seguidas en el último mapa 
                    }
                }
                console.log(dos_carreteras);
            }

        } else {
            console.log("bruh");
        }
        var arrayTexturasFilas = [arrayTexturas, arrayFilasSeguras]
        return arrayTexturasFilas;
    }

    direccionAzar() {
        var rand = Utilidades.numeroAleatorio(1, 2);
        var direccion_fila;
        rand == 1 ? direccion_fila = "derecha" : direccion_fila = "izquierda";
        console.log("dirección azar", direccion_fila);
        return direccion_fila;
    }

    nuevoMapa() { // si llega a la fila final, crear un nuevo mapa y hacer scroll arriba
        enemigo.limpiarEnemigos(); // vaciar arrayEnemigos
        contenedor_mapa.innerHTML = '';
        window.scrollTo(0, 0);
        contador_niveles++; // sumar un nivel
        contador_niveles_absolutos++;


        // leer monedas que había
        var monedas_guardadas = Utilidades.datosGuardados()["monedas"];
        // sumarle las nuevas conseguidas
        var monedas_nuevas = monedas_guardadas + 5 + ronda * 3;
        Utilidades.guardar(monedas_nuevas);
        sumar_monedas += monedas_nuevas;
        sumar_monedas_absolutas += monedas_nuevas;

        if (sumar_monedas > 0) {
            moneda += monedas_nuevas;
            sumar_monedas = 0;
        }
        mostrar_monedas.innerHTML = Utilidades.datosGuardados()["monedas"];

        pintarCuadros();

        // guardar en localstorage
        var datos = Utilidades.datosGuardados();
        var nuevo_nivel_max = datos["nivel_max"];
        if(contador_niveles_absolutos > datos["nivel_max"]){
            nuevo_nivel_max = contador_niveles_absolutos;
        }
        var guardado = {
            "monedas": datos["monedas"],
            "personaje": datos["personaje"],
            "p2": datos["p2"],
            "p3": datos["p3"],
            "nivel_max": nuevo_nivel_max,
            "niveles_superados": datos["niveles_superados"] + 1,
            "muertes_totales": datos["muertes_totales"]
        }
        localStorage.setItem('guardado', JSON.stringify(guardado));
    }

    reiniciarMapa() {

        enemigo.limpiarEnemigos(); // vaciar arrayEnemigos
        setTimeout(() => {
            contenedor_mapa.innerHTML = '';
            window.scrollTo(0, 0);
            contadorvidas--;
            // llamar a función para hacer innerHTML de corazones
            corazones();
            if (contadorvidas <= 0) {
                window.location.href = "../vistas/P_GameOver/GameOver.html";
            }
            activo = true;

            pintarCuadros();

            var oscurecer = document.getElementById('perder_vida');
            oscurecer.style.visibility = "hidden";
        }, 1000);

        // guardar en localstorage
        var datos = Utilidades.datosGuardados();
        var guardado = {
            "monedas": datos["monedas"],
            "personaje": datos["personaje"],
            "p2": datos["p2"],
            "p3": datos["p3"],
            "nivel_max": datos["nivel_max"],
            "niveles_superados": datos["niveles_superados"],
            "muertes_totales": datos["muertes_totales"] + 1
        }
        localStorage.setItem('guardado', JSON.stringify(guardado));
    }

}

// var mapa = new Mapa(7, 7, 100, 100, 1, "desierto");