document.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = localStorage.getItem("cursoSeleccionado");

  if (!datosGuardados){
    Swal.fire({
      icon:"warning",
      title:"No hay curso seleccionado",
      text:"Vuelve al catalogo y elige un curso primero",
      confirmButtonText:"Ir al catalogo"
    }).then(()=>{
      window.location.href="pagCursos.html";
    });
    return;
  }

  const curso = JSON.parse(datosGuardados);

  document.getElementById("tituloPagina").textContent = "PlayNote — " + curso.nombre;
  document.getElementById("bannerCurso").textContent = curso.nombre;
  document.getElementById("nombreCurso").textContent = curso.nombre;
  document.getElementById("instructorCurso").textContent = "Por: " + curso.instructor;
  document.getElementById("duracionCurso").textContent = "Duración: " + curso.horas + " horas";
  document.getElementById("leccionesCurso").textContent = "Lecciones " + curso.lecciones;
  document.getElementById("nivelCurso").textContent = "Nivel: " + curso.nivel;

  const img = document.getElementById("imagenCurso");
  img.src = curso.imagen;
  img.alt = curso.nombre;
});