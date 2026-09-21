
let cursoSeleccionado = {
    nombre: "Guitarra: Básico en Guitarra",
    rol: "estudiante"
};

function seleccionarCurso(curso) {

    let inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];

    if (inscripciones.length === 0) {
        Swal.fire({
            title: "No estás registrado",
            text: "Primero debes realizar una inscripción.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    let usuario = inscripciones[inscripciones.length - 1];

    cursoSeleccionado = {
        nombre: curso,
        rol: "estudiante"
    };

    localStorage.setItem("cursoSeleccionado", JSON.stringify(cursoSeleccionado));

    usuario.rol = "estudiante";
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    Swal.fire({
        title: "¡Curso seleccionado!",
        text: "El curso fue guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}

function recuperarCurso() {
    let curso = JSON.parse(localStorage.getItem("cursoSeleccionado"));

    if (curso) {
        console.log("Curso:", curso.nombre);
        console.log("Rol:", curso.rol);
    }
}


```
 
