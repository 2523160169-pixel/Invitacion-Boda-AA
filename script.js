/* =====================================================
   ABRIR INVITACIÓN
===================================================== */

const btnAbrir = document.getElementById("btnAbrir");
const contenido = document.getElementById("contenido");

btnAbrir.addEventListener("click", () => {

    contenido.classList.remove("oculto");
    contenido.classList.add("mostrar");

    setTimeout(() => {

        contenido.scrollIntoView({
            behavior: "smooth"
        });

    }, 400);

});


/* =====================================================
   MÚSICA
===================================================== */

const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

const progreso = document.getElementById("progreso");
const progresoContenedor =
    document.getElementById("progresoContenedor");

const tiempoActual =
    document.getElementById("tiempoActual");

const duracionMusica =
    document.getElementById("duracionMusica");

const textoPlay =
    document.querySelector(".texto-play");


let reproduciendo = false;


/* PLAY / PAUSA */

btnMusica.addEventListener("click", async () => {

    try {

        if (!reproduciendo) {

            await musica.play();

            reproduciendo = true;

            btnMusica.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            btnMusica.classList.add("reproduciendo");

            textoPlay.textContent =
                "Reproduciendo nuestra canción ♫";

        }

        else {

            musica.pause();

            reproduciendo = false;

            btnMusica.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            btnMusica.classList.remove("reproduciendo");

            textoPlay.textContent =
                "Toca para continuar nuestra canción";

        }

    }

    catch(error) {

        console.error("No se pudo reproducir la música:", error);

    }

});

/* DURACIÓN */

musica.addEventListener("loadedmetadata", () => {

    duracionMusica.textContent =
        formatearTiempo(musica.duration);

});


/* PROGRESO */

musica.addEventListener("timeupdate", () => {

    if (!musica.duration) return;

    const porcentaje =
        (musica.currentTime / musica.duration) * 100;

    progreso.style.width =
        porcentaje + "%";

    tiempoActual.textContent =
        formatearTiempo(musica.currentTime);

});


/* CLICK EN BARRA */

progresoContenedor.addEventListener("click", (evento) => {

    if (!musica.duration) return;

    const ancho =
        progresoContenedor.clientWidth;

    const posicion =
        evento.offsetX;

    musica.currentTime =
        (posicion / ancho) * musica.duration;

});


/* CUANDO TERMINA */

musica.addEventListener("ended", () => {

    reproduciendo = false;

    btnMusica.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    btnMusica.classList.remove("reproduciendo");

    textoPlay.textContent =
        "Toca para volver a reproducir nuestra canción";

});


/* FORMATEAR TIEMPO */

function formatearTiempo(segundos) {

    if (isNaN(segundos)) {
        return "0:00";
    }

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return (
        minutos +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );

}


/* =====================================================
   CUENTA REGRESIVA
===================================================== */

const fechaBoda =
    new Date(
        "November 28, 2026 17:00:00"
    ).getTime();


function actualizarNumero(elemento, nuevoValor) {

    if (!elemento) return;

    const valorAnterior =
        elemento.textContent;

    if (
        valorAnterior !==
        String(nuevoValor)
    ) {

        elemento.style.transform =
            "translateY(-8px)";

        elemento.style.opacity =
            "0";

        setTimeout(() => {

            elemento.textContent =
                nuevoValor;

            elemento.style.transform =
                "translateY(0)";

            elemento.style.opacity =
                "1";

        }, 150);

    }

}


function contador() {

    const ahora =
        new Date().getTime();

    const diferencia =
        fechaBoda - ahora;


    if (diferencia <= 0) {

        actualizarNumero(
            document.getElementById("dias"),
            "00"
        );

        actualizarNumero(
            document.getElementById("horas"),
            "00"
        );

        actualizarNumero(
            document.getElementById("minutos"),
            "00"
        );

        actualizarNumero(
            document.getElementById("segundos"),
            "00"
        );

        return;

    }


    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (
                diferencia /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutos =
        Math.floor(
            (
                diferencia /
                (1000 * 60)
            ) % 60
        );


    const segundos =
        Math.floor(
            (
                diferencia /
                1000
            ) % 60
        );


    actualizarNumero(
        document.getElementById("dias"),
        String(dias).padStart(2, "0")
    );


    actualizarNumero(
        document.getElementById("horas"),
        String(horas).padStart(2, "0")
    );


    actualizarNumero(
        document.getElementById("minutos"),
        String(minutos).padStart(2, "0")
    );


    actualizarNumero(
        document.getElementById("segundos"),
        String(segundos).padStart(2, "0")
    );

}


contador();

setInterval(contador, 1000);


/* =====================================================
   CARRUSEL DE FOTOS
   SIN MOVIMIENTO AUTOMÁTICO
===================================================== */

const track =
    document.getElementById("carruselTrack");

const btnAnterior =
    document.getElementById("anterior");

const btnSiguiente =
    document.getElementById("siguiente");

const indicadores =
    document.querySelectorAll(
        "#indicadores span"
    );

const slides =
    document.querySelectorAll(".slide");


let indiceActual = 0;


/* MOSTRAR FOTO */

function mostrarSlide(indice) {

    if (indice < 0) {

        indiceActual =
            slides.length - 1;

    }

    else if (
        indice >= slides.length
    ) {

        indiceActual = 0;

    }

    else {

        indiceActual = indice;

    }


    track.style.transform =
        `translateX(-${indiceActual * 100}%)`;


    indicadores.forEach(
        (indicador, i) => {

            indicador.classList.toggle(
                "activo",
                i === indiceActual
            );

        }
    );

}


/* SIGUIENTE */

btnSiguiente.addEventListener(
    "click",
    () => {

        mostrarSlide(
            indiceActual + 1
        );

    }
);


/* ANTERIOR */

btnAnterior.addEventListener(
    "click",
    () => {

        mostrarSlide(
            indiceActual - 1
        );

    }
);


/* INDICADORES */

indicadores.forEach(
    (indicador, indice) => {

        indicador.addEventListener(
            "click",
            () => {

                mostrarSlide(indice);

            }
        );

    }
);


/* =====================================================
   SWIPE EN CELULAR
===================================================== */

const carrusel =
    document.querySelector(".carrusel");

let touchStartX = 0;
let touchEndX = 0;


carrusel.addEventListener(
    "touchstart",
    (evento) => {

        touchStartX =
            evento.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


carrusel.addEventListener(
    "touchend",
    (evento) => {

        touchEndX =
            evento.changedTouches[0].screenX;

        manejarSwipe();

    },
    {
        passive: true
    }
);


function manejarSwipe() {

    const diferencia =
        touchStartX -
        touchEndX;


    if (
        Math.abs(diferencia) < 50
    ) {

        return;

    }


    if (diferencia > 0) {

        mostrarSlide(
            indiceActual + 1
        );

    }

    else {

        mostrarSlide(
            indiceActual - 1
        );

    }

}


/* =====================================================
   ANIMACIÓN AL HACER SCROLL
===================================================== */

const elementosAnimados =
    document.querySelectorAll(
        ".seccion, .evento-elegante, .timeline-item"
    );


const observador =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                (entrada) => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


elementosAnimados.forEach(
    (elemento) => {

        observador.observe(elemento);

    }
);