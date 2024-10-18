<?php
// Permitir todas las solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
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

// Obtener los datos del body de la solicitud
$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);

$orderId = $decodedData['orderId'];


// Verificar que ambos campos existan
if (empty($orderId) ) {
    echo json_encode(array("Message" => "Faltan datos para completar la compra"));
    exit();
}
$complete = "tomado";
// Actualizar el estado de la orden a "completado"
$sql = "UPDATE orders SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $complete, $orderId);

if ($stmt->execute()) {
    echo json_encode(array("success" => true, "Message" => "Compra actualizada con éxito"));
} else {
    echo json_encode(array("success" => false, "Message" => "Error al actualizar la compra"));
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
