<?php
// Conexión a la base de datos (reemplaza 'localhost', 'usuario', 'contraseña' y 'basededatos' con tus propios detalles)
$conexion = new mysqli('localhost', 'usuario', 'contraseña', 'basededatos');

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// Recibe los datos del formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $usuario = $_POST["usuario"];
    $correo = $_POST["correo"];
    $contrasena = $_POST["contrasena"];

    // Consulta SQL para verificar si el usuario ya existe
    $consulta_usuario_existente = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
    $resultado_usuario_existente = $conexion->query($consulta_usuario_existente);

    // Verifica si el usuario ya existe
    if ($resultado_usuario_existente->num_rows > 0) {
        // Usuario ya registrado, puedes mostrar un mensaje de error o redirigirlo a la página de registro
        echo "El nombre de usuario ya está en uso. Elige otro.";
    } else {
        // Inserta el nuevo usuario en la base de datos
        $consulta_registro = "INSERT INTO usuarios (nombre, usuario, correo, contrasena) VALUES ('$nombre', '$usuario', '$correo', '$contrasena')";
        if ($conexion->query($consulta_registro) === TRUE) {
            // Registro exitoso, puedes redirigirlo a otra página
            header("Location: index.html");
            exit();
        } else {
            // Error en el registro, puedes mostrar un mensaje de error o redirigirlo a la página de registro
            echo "Error en el registro: " . $conexion->error;
        }
    }
}

// Cierra la conexión
$conexion->close();
?>
