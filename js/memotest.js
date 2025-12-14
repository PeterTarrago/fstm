/* Archivo: js/memotest.js */

// TUS IMÁGENES EXACTAS
const imagenesBase = [
  '../imagenes/cliente/carrousel_cliente1.jpg',
  '../imagenes/cliente/carrousel_cliente2.jpg',
  '../imagenes/grafica/carrousel_grafica3.jpg',
  '../imagenes/grafica/carrousel_grafica4.jpg',
  '../imagenes/ropa/carrousel_ropa1.jpg',
  '../imagenes/ropa/carrousel_ropa2.jpg'
];

let cartas = [];
let cartaVolteada = false;
let bloquearTablero = false;
let primeraCarta, segundaCarta;
let contadorMovimientos = 0;
let paresEncontrados = 0;

const tablero = document.getElementById('tablero');
const spanMovimientos = document.getElementById('movimientos');
const mensajeGanador = document.getElementById('mensaje-ganador');

function iniciarJuego() {
  // Duplicamos y mezclamos
  cartas = [...imagenesBase, ...imagenesBase];
  cartas.sort(() => 0.5 - Math.random());

  // Reseteamos variables visuales
  tablero.innerHTML = '';
  contadorMovimientos = 0;
  paresEncontrados = 0;
  spanMovimientos.innerText = 0;
  mensajeGanador.style.display = 'none';

  // Creamos el HTML de cada carta
  cartas.forEach(imgSrc => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.imagen = imgSrc;

    carta.innerHTML = `
      <div class="cara cara-trasera">FSTM</div>
      <div class="cara cara-frontal">
          <img src="${imgSrc}" alt="Juego">
      </div>
    `;

    carta.addEventListener('click', voltearCarta);
    tablero.appendChild(carta);
  });
}

function voltearCarta() {
  if (bloquearTablero) return;
  if (this === primeraCarta) return;

  this.classList.add('flip');

  if (!cartaVolteada) {
    cartaVolteada = true;
    primeraCarta = this;
    return;
  }

  segundaCarta = this;
  incrementarMovimientos();
  verificarMatch();
}

function verificarMatch() {
  let esMatch = primeraCarta.dataset.imagen === segundaCarta.dataset.imagen;
  esMatch ? deshabilitarCartas() : desvoltearCartas();
}

function deshabilitarCartas() {
  primeraCarta.removeEventListener('click', voltearCarta);
  segundaCarta.removeEventListener('click', voltearCarta);
  paresEncontrados++;
  resetearTablero();

  if (paresEncontrados === imagenesBase.length) {
      setTimeout(() => { mensajeGanador.style.display = 'block'; }, 500);
  }
}

function desvoltearCartas() {
  bloquearTablero = true;
  setTimeout(() => {
    primeraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');
    resetearTablero();
  }, 1000);
}

function resetearTablero() {
  [cartaVolteada, bloquearTablero] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

function incrementarMovimientos() {
    contadorMovimientos++;
    spanMovimientos.innerText = contadorMovimientos;
}

function reiniciarJuego() {
    iniciarJuego();
}

document.addEventListener('DOMContentLoaded', iniciarJuego);