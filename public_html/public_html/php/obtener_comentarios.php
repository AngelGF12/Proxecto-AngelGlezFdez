<?php
//Conexión a la base de datos
$conexion = new mysqli('localhost', 'gestor', 'secreto', 'proyecto');

//Se verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

//Se prepara la consulta SQL para obtener comentarios
$sql = "SELECT idusuario, titulo, comentario FROM comentarios";

//Se ejecuta la consulta
$result = $conn->query($sql);

//Se verifica si se obtuvieron resultados
if ($result->num_rows > 0) {
    //Se obtienen los resultados como un array asociativo
    while ($row = $result->fetch_assoc()) {
        $comentarios[] = [
            'idusuario' => $row['idusuario'],
            'titulo' => $row['titulo'],
            'comentario' => $row['comentario']
        ];
    }
    $response = ['success' => true, 'comentarios' => $comentarios];
} else {
    $response = ['success' => false, 'error' => 'No se encontraron comentarios'];
}

//Se cierra la conexión
$conn->close();

//Se devuelve la respuesta en formato JSON
echo json_encode($response);
?>
