let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let formulario = document.getElementById("form-registro");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    registrarUsuario();

});


function registrarUsuario() {

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let contraseña = document.getElementById("password").value;
    let contraseña2 = document.getElementById("password2").value;


    if (nombre == "") {

        alert("Por favor ingresa tu nombre");

        return;
    }


    if (correo == "") {

        alert("Por favor ingresa tu correo");

        return;
    }


    if (contraseña == "") {

        alert("Por favor ingresa una contraseña");

        return;
    }


    if (contraseña2 == "") {

        alert("Por favor confirma tu contraseña");

        return;
    }


    if (contraseña != contraseña2) {

        alert("Las contraseñas no coinciden");

        return;
    }


    let correoExiste = false;

    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].correo == correo) {

            correoExiste = true;

        }

    }


    if (correoExiste == true) {

        alert("Este correo ya está registrado");

        return;
    }


    let usuario = {

        nombre: nombre,
        correo: correo,
        contraseña: contraseña

    };

    usuarios.push(usuario);


    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");


    formulario.reset();


    window.location.href = "login.html";

}