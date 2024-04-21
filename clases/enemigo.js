class Enemigo {
    constructor(casilla_id, longitud, img, velocidad) {
        this.casilla_id = casilla_id;
        this.longitud = longitud;
        this.img = img;
        this.velocidad = 10;
    }
    cargarEnemigos(mapa, arrayCasillas) {
        let enemigo;
        var colocar_enemigo = false;
        var casillas_recorridas = 0; // contar casillas de fila recorridas  
        var enemigos_colocados = 0; // contar enemigos colodas en fila
        for (let index in arrayCasillas) {

            if (arrayCasillas[index].segura == false) { // tomar filas inseguras
                //console.log(arrayCasillas[index]);
                casillas_recorridas++;
                if (casillas_recorridas >= 8) { // si se recorren todas las casillas de la fila se reinician los contadores 
                    casillas_recorridas = 0;
                    enemigos_colocados = 0;
                }
                if (casillas_recorridas == 0) {
                    colocar_enemigo = true;
                } else if (casillas_recorridas > 0) {
                    colocar_enemigo = false;
                }
                var random = Utilidades.numeroAleatorio(1, 3);
                var numero = 2;
                if(contador_niveles_absolutos > 5) numero = 3;
                if (random == 1 && enemigos_colocados < numero) { // numero aleatorio para sacar enemigos y debe haber menos de cinco porfilabbb
                    colocar_enemigo = true;
                } else if (enemigos_colocados >= 3) {
                    colocar_enemigo = false;
                }

                if (colocar_enemigo == true) {
                    colocar_enemigo = false;
                    console.log("enemigos colocados", enemigos_colocados);
                    enemigos_colocados++;
                    enemigo = new Enemigo(arrayCasillas[index].casilla, 1, "../recursos/enemigo" + Math.ceil(contador_niveles / 2) + ".gif", 10);
                    arrayEnemigos["enemigo_" + enemigo.casilla_id] = enemigo;

                    contenedor_mapa.innerHTML += `<img id="enemigo_${arrayCasillas[index].casilla}" src="${enemigo.img}" style="position:absolute; top:0px; left: 0px; width: 10%;" />`;
                    arrayCasillas[index].enemigo = true;

                    enemigo.posicionEnemigo(arrayCasillas[index].casilla); //colocar imagenes en posisición absoluta
                }
            }
        }
        // console.log(arrayEnemigos);

        this.mover();


        // colocar enemigos en filas 
        var random = Utilidades.numeroAleatorio(1, 4);
    }
    posicionEnemigo(casilla) {
        /* Posición enemigo */
        let enemigoActual = arrayEnemigos["enemigo_" + casilla];
        let elemento_casilla = document.getElementById('div_casilla_0_0');
        let id_enemigo = enemigoActual.casilla_id;
        let enemigo_img = document.getElementById(`enemigo_${id_enemigo}`);

        let altura_casilla = elemento_casilla.clientHeight + 4;
        //console.log(id_enemigo.split('_')[1]);
        enemigo_img.style.top = ((id_enemigo.split('_')[1]) * (altura_casilla) + 5) + 'px'; //colocar altura de personaje
        enemigo_img.style.left = (id_enemigo.split('_')[2]) * (ancho_casilla + 0.4) + '%'; // -1 pq 0 px es la 1era col
    }

    mover() {
        if (borrar_timeout_enemigos == true) {
            clearTimeout(moverEnemigo);
            borrar_timeout_enemigos = false;

        }
        // let ancho_columna = ((client_width/9) / client_width) * 100;
        console.log(arrayEnemigos);
        console.log(moverEnemigo);
        function incrementar() {
            for (let enemigo in arrayEnemigos) {
                let id_enemigo = arrayEnemigos[enemigo].casilla_id;
                arrayCasillas[id_enemigo].enemigo = false;
            }
            for (let enemigo in arrayEnemigos) { // el segundo para escribir nuevos posiciones del enemigo=true, evitando la sobreescritura que ocurría antes
                let id_enemigo = arrayEnemigos[enemigo].casilla_id;
                let direccion_enemigo = arrayCasillas[id_enemigo].direccion;
                let enemigo_img = document.getElementById('enemigo_' + id_enemigo);
                // console.log(enemigo_img);
                let columna_salida = parseInt(id_enemigo.split('_')[2]); // casilla_fila_columna

                if (direccion_enemigo == 'derecha') {
                    if (columna_salida < 8) {
                        columna_salida++;

                    } else if (columna_salida >= 8) {
                        columna_salida = 0;
                    }
                } else if (direccion_enemigo == 'izquierda') {
                    if (columna_salida > 0) {
                        columna_salida--;
                    } else if (columna_salida <= 0) {
                        columna_salida = 8;
                    }
                }


                let siguiente_casilla = `casilla_${id_enemigo.split('_')[1]}_${columna_salida}`;

                arrayEnemigos[enemigo].casilla_id = siguiente_casilla; // cambiar posicion de enemigo en el objeto
                enemigo_img.style.left = columna_salida * (ancho_casilla + 0.4) + '%';// cambiar posición del enemigo en la imagen

                enemigo_img.id = `enemigo_${siguiente_casilla}`;

                arrayCasillas[siguiente_casilla].enemigo = true;
                personaje.perderVida(arrayCasillas[siguiente_casilla]); // comprobar si hay colisión

            }
            moverEnemigo = setTimeout(incrementar, 500);


        }
        setTimeout(incrementar, 500);

    }

    limpiarEnemigos() {
        borrar_timeout_enemigos = true;
        for (let casilla in arrayCasillas) {
            arrayCasillas[casilla].enemigo = false;
        }
        arrayEnemigos = [];

    }

}

