<?php
// Conexión a la base de datos (reemplaza 'localhost', 'usuario', 'contraseña' y 'basededatos' con tus propios detalles)
$conexion = new mysqli('localhost', 'usuario', 'contraseña', 'basededatos');

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// Recibe los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    // Consulta SQL para verificar las credenciales
    $consulta = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND contrasena = '$contrasena'";
    $resultado = $conexion->query($consulta);

    // Verifica si se encontró un usuario con las credenciales proporcionadas
    if ($resultado->num_rows > 0) {
        // Usuario autenticado, puedes redirigirlo a otra página
        header("Location: index.html");
        exit();
    } else {
        // Credenciales incorrectas, puedes mostrar un mensaje de error o redirigirlo a la página de inicio de sesión
        echo "Credenciales incorrectas. Vuelve a intentarlo.";
    }
}

// Cierra la conexión
$conexion->close();
?>
