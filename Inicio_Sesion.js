class Usuario {
    constructor(nombre, tipoDocumento, numeroDocumento, correo, contrasena) {
        this._nombre = nombre;
        this._tipoDocumento = tipoDocumento;
        this._numeroDocumento = numeroDocumento;
        this._correo = correo;
        this._contrasena = contrasena;
    }

    get nombre() {
        return this._nombre;
    }
    set nombre(valor) {
        this._nombre = valor;
    }

    get tipoDocumento() {
        return this._tipoDocumento;
    }
    set tipoDocumento(valor) {
        this._tipoDocumento = valor;
    }

    get numeroDocumento() {
        return this._numeroDocumento;
    }
    set numeroDocumento(valor) {
        this._numeroDocumento = valor;
    }

    get correo() {
        return this._correo;
    }
    set correo(valor) {
        this._correo = valor;
    }

    get contrasena() {
        return this._contrasena;
    }
    set contrasena(valor) {
        this._contrasena = valor;
    }

 
}



const listaUsuarios = [];
const listaUsuario = new Usuario("Julian Linares", "Targeta de identidad", "123456789", "julian@gmail.com", "12131422");
listaUsuarios.push(listaUsuario);

function registroUsuario() {
    try {
        var nombreUsuario = document.getElementById("id_Usuario").value;
        var tipoDocumento = document.getElementById("tipo_documento").value;
        var numeroDocumento = document.getElementById("id_documento").value;
        var correo = document.getElementById("id_Correo").value;
        var contrasena = document.getElementById("id_Password").value;

        const nuevoUsuario = new Usuario(
            nombreUsuario,
            tipoDocumento,
            numeroDocumento,
            correo,
            contrasena
        );

        let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        listaUsuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

        alert(" Registro exitoso");
        window.location.href = "Inicio_Sesion.html";





        for (var i = 0; i < listaUsuarios.length; i++) {
            console.log(listaUsuarios[i].mostrarDatos());

        }

    } catch (error) {
        alert(" Error en el registro, por favor intente nuevamente");
        console.error("Error en el registro de usuario:", error);
    }
}



function validarUsuario() {


    var nombreUsuario = document.getElementById("nombreUsuario").value;
    var contraseñaUsuario = document.getElementById("contraseñaUsuario").value;


    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let VUsuario = true;
    for (var i = 0; i < listaUsuarios.length; i++) {

        if (nombreUsuario === listaUsuarios[i]._nombre) {
            VUsuario = false;
            if (contraseñaUsuario === listaUsuarios[i]._contrasena) {
                alert("Sesión iniciada");
                window.location.href = "Cine.html";
                break;
            } else {

                alert("Contraseña incorrecta, ingresa nuevamente");

            }
            break;

        }


    }
    if (VUsuario) {
        alert("Usuario incorrecto, ingresa nuevamente");
    }
}


