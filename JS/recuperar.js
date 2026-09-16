let botonRestablecer = document.querySelector("#btnRestablecer");

botonRestablecer.addEventListener("click", async ()=> {

    let nuevaContraseña = document.getElementById("nuevaContraseña").value;
    let confirmarContraseña = document.getElementById("confirmarContraseña").value;

    if (nuevaContraseña == "" || confirmarContraseña == "") {
        await Swal.fire({
            title: "Campos vacíos",
            text: "Completa todos los campos",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
    }

    else if (nuevaContraseña != confirmarContraseña) {
        await Swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }

    else {

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));

        if (usuarios == null) {
            await Swal.fire({
                title: "Error",
                text: "No hay usuarios registrados",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
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
                await Swal.fire({
                    title: "Correo no encontrado",
                    text: "El correo no está registrado",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            }

            else {

                usuarioEncontrado.contraseña = nuevaContraseña;

                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                await Swal.fire({
                    title: "¡Éxito!",
                    text: "Contraseña restablecida correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });

                window.location.href = "login.html";
            }
        }
    }
});