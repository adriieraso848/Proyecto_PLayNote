let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let codigo = document.getElementById("codigo");
let correo = document.getElementById("correo");
let curso = document.getElementById("curso");

let inscribirse = document.getElementById("inscribirse");
let verInscripciones = document.getElementById("verInscripciones");
let lista = document.getElementById("listaInscripciones");
let mensajeExito = document.getElementById("mensajeExito");

function obtenerInscripciones() {
    return JSON.parse(localStorage.getItem("inscripciones")) || [];
}

function mostrarInscripciones() {
    let inscripciones = obtenerInscripciones();
    lista.innerHTML = inscripciones.length ? "" : "<p>No hay inscripciones.</p>";

    inscripciones.forEach(i => {
        let tarjeta = document.createElement("div");
        tarjeta.innerHTML = `
            <p>Estudiante: ${i.nombre} ${i.apellido}</p>
            <p>Código: ${i.codigo}</p>
            <p>Correo: ${i.correo}</p>
            <p>Curso: ${i.curso}</p>
        `;
        lista.appendChild(tarjeta);
    });
}

function revisarCampos() {
    inscribirse.disabled = !(nombre.value && apellido.value && codigo.value && correo.value);
}

[nombre, apellido, codigo, correo].forEach(campo => {
    campo.addEventListener("input", revisarCampos);
});

inscribirse.addEventListener("click", function() {
    if (!nombre.value || !apellido.value || !codigo.value || !correo.value) {
        alert("Completa todos los campos");
        return;
    }

    let inscripciones = obtenerInscripciones();

    inscripciones.push({
        nombre: nombre.value,
        apellido: apellido.value,
        codigo: codigo.value,
        correo: correo.value,
        curso: curso.value
    });

    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));
    alert("Inscripción realizada");

    mensajeExito.classList.remove("hidden");

    nombre.value = "";
    apellido.value = "";
    codigo.value = "";
    correo.value = "";

    revisarCampos();
    mostrarInscripciones();
});

verInscripciones.addEventListener("click", mostrarInscripciones);s