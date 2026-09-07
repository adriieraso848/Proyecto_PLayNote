function restablecerContraseña() {

    let nuevaContraseña = document.getElementById("nuevaContraseña").value;
    let confirmarContraseña = document.getElementById("confirmarContraseña").value;

    if (nuevaContraseña == "" || confirmarContraseña == "") {
        console.log("Completa todos los campos");
    }
    else if (nuevaContraseña != confirmarContraseña) {
        console.log("Las contraseñas no coinciden");
    }
    else {

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));

        if (usuarios == null) {
            console.log("No hay usuarios registrados");
        }
        else {

            let correo = prompt("Escribe el correo de tu cuenta");

            let usuarioEncontrado = null;

            for (let i = 0; i < usuarios.length; i++) {

                if (usuarios[i].correo == correo) {
                    usuarioEncontrado = usuarios[i];
                }
            }

            if (usuarioEncontrado == null) {
                console.log("El correo no está registrado");
            }
            else {

                usuarioEncontrado.contraseña = nuevaContraseña;

                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                console.log("Contraseña restablecida correctamente");

                window.location.href = "login.html";
            }
        }
    }
}