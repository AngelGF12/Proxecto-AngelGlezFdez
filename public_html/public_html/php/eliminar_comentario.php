<?php
//Conexión a la base de datos
$conexion = new mysqli('localhost', 'gestor', 'secreto', 'proyecto');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

//Se obtiene el ID del comentario a eliminar
$comentario = $_POST['comentario'];

//Se prepara la consulta SQL para eliminar un comentario por su ID
$sql = "DELETE FROM comentarios WHERE idusuario = idusuario";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $comentario_id); // "i" indica que es un parámetro de tipo entero

if ($stmt->execute()) {
    $response = ['success' => true];
} else {
    $response = ['success' => false, 'error' => $stmt->error];
}

//Se cierra la conexión
$stmt->close();
$conn->close();

//Se devuelve la respuesta en formato JSON
echo json_encode($response);
?>
