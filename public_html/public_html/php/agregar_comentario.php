<?php
//Conexión a la base de datos
$conexion = new mysqli('localhost', 'gestor', 'secreto', 'proyecto');

//Se verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

//Se obtienen datos del formulario
$idusuario = $_POST['usuario'];
$comentario = $_POST['comentario'];

//Se prepara la consulta SQL para insertar un nuevo comentario
$sql = "INSERT INTO comentarios (idusuario, titulo, comentario) VALUES ('$idusuario', '$titulo', '$comentario', NOW())";

//Se ejecuta la consulta
if ($conn->query($sql) === TRUE) {
    $response = ['success' => true];
} else {
    $response = ['success' => false, 'error' => $conn->error];
}

//Se cierra la conexión
$conn->close();

//Se devuelve la respuesta en formato JSON
echo json_encode($response);
?>
