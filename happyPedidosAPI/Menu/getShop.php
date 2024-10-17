<?php
// Permitir todas las solicitudes desde cualquier origen (para desarrollo, en producción especifica el dominio)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "happypedidos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener el resumen del pedido (order_id y datos relevantes)
$sql = "SELECT SUM(price * quantity) AS total, order_id, SUM(quantity) AS items, SUM(price * 0.15) AS iva 
        FROM order_dishes 
        GROUP BY order_id
        ORDER BY order_id DESC 
        LIMIT 1"; // Traer el último pedido

$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $orderSummary = $result->fetch_assoc();
    echo json_encode($orderSummary); // Devolver el resumen del pedido en formato JSON
} else {
    echo json_encode(array("Message" => "No se encontraron detalles del pedido."));
}

// Cerrar conexión
$conn->close();
?>
