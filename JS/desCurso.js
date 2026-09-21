const LECCIONES = [
  { titulo: "Primera lección: Partes de la guitarra", imagen: "img/Partes-de-una-guitarra-.webp", etiqueta: "Partes de la Guitarra" },
  { titulo: "Segunda lección: Afinación", imagen: "img/afinacion.jpg", etiqueta: "Afinación de la Guitarra" },
  { titulo: "Tercera lección: Postura", imagen: "img/postura.jpg", etiqueta: "Postura Correcta" },
  { titulo: "Cuarta lección: Acordes básicos", imagen: "img/acordes.jpg", etiqueta: "Acordes Básicos" },
  { titulo: "Quinta lección: Práctica", imagen: "img/guitarra1.jpg", etiqueta: "¡Practica Cambios de Acordes!" },
  { titulo: "Sexta lección: Consejos de aprendizaje", imagen: "img/aprender.jpg", etiqueta: "Consejos para Tocar Guitarra" },
];

document.addEventListener("DOMContentLoaded", function () {
  const curso = obtenerCursoGuardado();
  if (!curso) return; 
  mostrarDatosCurso(curso);
  mostrarLecciones();
});

function obtenerCursoGuardado() {
  const datosGuardados = localStorage.getItem("cursoSeleccionado");
  if (!datosGuardados) {
    avisarYRedirigir(
      "warning",
      "No hay curso seleccionado",
      "Vuelve al catálogo y elige un curso primero"
    );
    return null;
  }
  try {
    return JSON.parse(datosGuardados);
  } catch (error) {
    avisarYRedirigir(
      "error",
      "No se pudo leer el curso",
      "La información guardada no es válida. Elige el curso de nuevo"
    );
    return null;
  }
}

function avisarYRedirigir(icono, titulo, texto) {
  Swal.fire({
    icon: icono,
    title: titulo,
    text: texto,
    confirmButtonText: "Ir al catálogo"
  }).then(function () {
    window.location.href = "pagCursos.html";
  });
}

function mostrarDatosCurso(curso) {
  document.getElementById("tituloPagina").textContent = "PlayNote — " + curso.nombre;
  document.getElementById("bannerCurso").textContent = curso.nombre;
  document.getElementById("nombreCurso").textContent = curso.nombre;
  document.getElementById("instructorCurso").textContent = "Por: " + curso.instructor;
  document.getElementById("duracionCurso").textContent = "Duración: " + curso.horas + " horas";
  document.getElementById("leccionesCurso").textContent = "Lecciones: " + curso.lecciones;
  document.getElementById("nivelCurso").textContent = "Nivel: " + curso.nivel;
  const imagen = document.getElementById("imagenCurso");
  imagen.src = curso.imagen;
  imagen.alt = curso.nombre;
}

function mostrarLecciones() {
  const plantilla = document.getElementById("plantillaLeccion");
  const contenedor = document.getElementById("listaLecciones");

  LECCIONES.forEach(function (leccion) {
    const tarjeta = plantilla.content.cloneNode(true);
    const img = tarjeta.querySelector(".img-leccion");
    img.src = leccion.imagen;
    img.alt = leccion.etiqueta;
    tarjeta.querySelector(".etiqueta-leccion").textContent = leccion.etiqueta;
    tarjeta.querySelector(".titulo-leccion").textContent = leccion.titulo;
    const botonIniciar = tarjeta.querySelector(".btn-iniciar");
    botonIniciar.addEventListener("click", function () {
      iniciarLeccion(leccion);
    });
    contenedor.appendChild(tarjeta);
  });
}

function iniciarLeccion(leccion) {
  Swal.fire({
    icon: "info",
    title: "Comenzando lección",
    text: leccion.titulo,
    confirmButtonText: "Entendido"
  });
}