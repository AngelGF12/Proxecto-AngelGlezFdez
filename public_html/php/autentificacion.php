<?php
//Conexión a la base de datos
$conexion = new mysqli('localhost', 'gestor', 'secreto', 'proyecto');

//Se verifica la conexión
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

//Se reciben los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $idusuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    //Consulta SQL para verificar las credenciales
    $consulta = "SELECT * FROM usuarios WHERE idusuario = '$idusuario' AND contrasena = '$contrasena'";
    $resultado = $conexion->query($consulta);

    //Se verifica si se encontró un usuario con las credenciales proporcionadas
    if ($resultado->num_rows > 0) {
        //Usuario autenticado, se redirige a la página principal
        header("Location: index.html");
        exit();
    } else {
        //Credenciales incorrectas, se muestra un mensaje de error
        echo "Credenciales incorrectas. Vuelve a intentarlo.";
    }
}

//Se cierra la conexión
$conexion->close();
?>
