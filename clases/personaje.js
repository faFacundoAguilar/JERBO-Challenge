class Personaje {
    constructor(casilla, vida, vidas, accion, img, monedas) {
        this.casilla = casilla;
        this.vida = vida;
        this.vidas = vidas;
        this.accion = accion;
        this.img = img;
        this.monedas = monedas;
    }
    casillaInicio(mapa, arrayCasillas) {
        var posicion_inicio_id = `casilla_0_${Math.floor(mapa.filas / 2)}`; // casilla inicio
        casillaActual = arrayCasillas[posicion_inicio_id]; // seleccinar el objeto del array asociativo
        casillaActual.personaje = true; //cambiar la personaje = true
        console.log(arrayCasillas);

        contenedor_mapa.innerHTML += `<img id="personaje_img" src="${personaje.img}" style="position:absolute; top:0px; left: 0px; width: 10%;" />`;

        this.posicionPersonajeInicio();  // Colocar imagen de personaje en valor absoluto con las filas y el alto de las filas y las columnas y su ancho

        document.body.style.overflow = 'hidden';
    }

    // función que se activa al saltar hacia delante. Cambia la posición anterior a false y la siguiente a true
    saltar(direccion) {
        casillaActual.personaje = false; // casilla de la que salta a false
        var fila_actual = casillaActual.fila; // sacar fila de la casilla de la que se salta
        var columna_actual = casillaActual.columna; // sacar columna
        // en función del parámetro direccion que se lanza según la tecla puslada
        if (direccion == 'del') {
            if (fila_actual + 1 == mapa.filas) {
                mapa.nuevoMapa(); // comprobar si está en la fila final
            } else {
                personaje.casilla = `casilla_${fila_actual + 1}_${columna_actual}`; //sumar una fila y salta
                this.ejecutarSalto(casillaActual, "del");
                console.log(casillaActual.casilla, casillaActual.enemigo);
            }
            console.log(personaje);
        } else if (direccion == 'drch' && columna_actual + 1 < mapa.columnas) {
            personaje.casilla = `casilla_${fila_actual}_${columna_actual + 1}`; //sumar una columna y saltar
            this.ejecutarSalto(casillaActual, "drch");
            console.log(casillaActual.casilla, casillaActual.enemigo);
        } else if (direccion == 'izq' && columna_actual + 1 > 1) {
            personaje.casilla = `casilla_${fila_actual}_${columna_actual - 1}`; //sumar una columna y saltar
            this.ejecutarSalto(casillaActual, "izq");
            console.log(casillaActual.casilla, casillaActual.enemigo);
        } else if (direccion == 'arrb') {
            personaje.casilla = `casilla_${fila_actual - 1}_${columna_actual}`; //sumar una columna y saltar
            if (fila_actual == 0) {
                casillaActual.personaje = true;
            } else {
                this.ejecutarSalto(casillaActual, "atras");
            }
        }
        // console.log('fila siguiente', fila_siguiente);
    }

    ejecutarSalto(casillaAnterior, dir) {
        var casillaAnterior = casillaAnterior;
        casillaActual = arrayCasillas[personaje.casilla]; //obtener casilla a la que se ha saltado

        // console.log(arrayCasillas);
        this.posicionPersonaje(casillaActual.fila, casillaAnterior, dir);  // cambiar posición absoluta personaje
        setTimeout(() => {
            casillaActual.personaje = true; // personaje=true en casilla a la que se salta
            this.perderVida(casillaActual); // comprueba si hay colisión
        }, 70);

    }

    posicionPersonajeInicio() { //cambiar posicion absoluta personaje
        /* altura camara */
        var elemento_casilla = document.getElementById('div_casilla_0_0'); //obtener una casilla cualquiera, todas son iguales
        var altura_casilla_actualizada = elemento_casilla.clientHeight + 4; //altura de la casilla, ajustada a pantalla del cliente y con los bordes
        var altura_casilla_sumador = (elemento_casilla.clientHeight + 3) * 0 - 10; //altura hacia la que hacer scrollTo
        // personaje_img.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({ top: altura_casilla_sumador, behavior: "smooth" });

        /* Posición personaje */
        personaje_img = document.getElementById('personaje_img');
        personaje_img.style.top = (casillaActual.fila) * (altura_casilla_actualizada) + 'px'; //colocar altura de personaje
        personaje_img.style.left = '44.4%'; // -1 pq 0 px es la 1era col

    }

    posicionPersonaje(fila, casillaAnterior, dir) { //cambiar posicion absoluta personaje
        /* altura camara */
        //console.log("casilla anterior", casillaAnterior);
        var elemento_casilla = document.getElementById('div_casilla_0_0'); //obtener una casilla cualquiera, todas son iguales
        var altura_casilla_actualizada = elemento_casilla.clientHeight + 4; //altura de la casilla, ajustada a pantalla del cliente y con los bordes
        var altura_casilla_sumador = (elemento_casilla.clientHeight + 3) * fila - 10; //altura hacia la que hacer scrollTo
        // personaje_img.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({ top: altura_casilla_sumador, behavior: "smooth" });

        /* Posición personaje */
        personaje_img = document.getElementById('personaje_img');
        var altura_anterior = (casillaAnterior.fila) * (altura_casilla_actualizada);
        var margen_anterior = (casillaAnterior.columna) * 11.1;
        var acumulador = 0;
        var acumulador_lat = 0;
        animacionSalto();
        console.log(dir);
        function animacionSalto() {
            var alturaIteracion = altura_anterior + acumulador;
            var margenIteracion = margen_anterior + acumulador_lat;
            personaje_img.style.top = altura_anterior + acumulador + 'px';
            personaje_img.style.left = margen_anterior + acumulador_lat + '%';
            console.log(personaje_img.style.left);
            if (dir == "del") {
                acumulador += 4;
                //console.log("check", alturaIteracion, (casillaActual.fila) * (altura_casilla_actualizada) );
                if (alturaIteracion <= (casillaActual.fila) * (altura_casilla_actualizada)) {
                    setTimeout(animacionSalto, 4);
                }
            } else if (dir == "atras") {
                acumulador -= 4;
                if (alturaIteracion >= (casillaActual.fila) * (altura_casilla_actualizada)) {
                    setTimeout(animacionSalto, 4);
                }
            } else if (dir == "drch") {
                // console.log(margenIteracion, "margen Iteracionnnnnnnnnnnnnnnnnnnnnn",dir);
                // console.log(personaje_img);
                acumulador_lat += 0.2;
                if (margenIteracion <= (casillaActual.columna) * 11.13) {
                    setTimeout(animacionSalto, 4);
                }
            } else if (dir == "izq") {
                acumulador_lat -= 0.2;
                if (margenIteracion >= (casillaActual.columna) * 11.13) {
                    setTimeout(animacionSalto, 4);

                }
            }
        }

        //personaje_img.style.top = (casillaActual.fila) * (altura_casilla_actualizada) + 'px'; //colocar altura de personaje
        // personaje_img.style.left = (casillaActual.columna) * (ancho_casilla + 0.4) + '%'; // -1 pq 0 px es la 1era col
    }

    perderVida(casillaActual) {
        if (casillaActual.personaje == true && casillaActual.enemigo == true) {
            activo = false;
            var img = document.getElementById('personaje_img');
            img.src = '../recursos/explode-boom.gif';
            console.log(this.img, "this.img");
            ballon.play();
            ballon.currentTime = 0.4;

            var oscurecer = document.getElementById('perder_vida');
            oscurecer.style.visibility = "visible";

            mapa.reiniciarMapa(); // si colisionas llamar a reiniciar mapa que será como nuevoNivel pero carga el nivel actual

        }

    }
}

// let personaje = new Personaje(undefined, true, 3, "standing", "imagen_src",  0);
