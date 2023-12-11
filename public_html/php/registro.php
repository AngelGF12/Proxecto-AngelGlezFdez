<?php
//Conexión a la base de datos
$conexion = new mysqli('localhost', 'gestor', 'secreto', 'proyecto');

//Se verifica la conexión
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

//Se reciben los datos del formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $idusuario = $_POST["usuario"];
    $correo = $_POST["correo"];
    $contrasena = $_POST["contrasena"];

    //Consulta SQL para verificar si el usuario ya existe
    $consulta_usuario_existente = "SELECT * FROM usuarios WHERE idusuario = '$idusuario'";
    $resultado_usuario_existente = $conexion->query($consulta_usuario_existente);

    //Se verifica si el usuario ya existe
    if ($resultado_usuario_existente->num_rows > 0) {
        //Usuario ya registrado, se muestra un mensaje de error
        echo "El nombre de usuario ya está en uso. Elige otro.";
    } else {
        //Se inserta el nuevo usuario en la base de datos
        $consulta_registro = "INSERT INTO usuarios (nombre, idusuario, correo, contrasena) VALUES ('$nombre', '$idusuario', '$correo', '$contrasena')";
        if ($conexion->query($consulta_registro) === TRUE) {
            //Registro exitoso, se redirige a la página principal
            header("Location: index.html");
            exit();
        } else {
            //Error en el registro, se muestra un mensaje de error
            echo "Error en el registro: " . $conexion->error;
        }
    }
}

//Se cierra la conexión
$conexion->close();
?>
