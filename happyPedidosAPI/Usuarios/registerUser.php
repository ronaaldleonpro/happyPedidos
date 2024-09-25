<?php
// registerUser.php
// Mostrar todos los errores PHP (solo en desarrollo, para producción, desactiva esto)
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

// Configuración de conexión a la base de datos
$servername = "localhost"; // o la IP de tu servidor
$username = "root"; // tu usuario de base de datos
$password = ""; // tu contraseña de base de datos
$dbname = "happyPedidos"; // el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

ob_clean();

// Establecer encabezado para indicar que la respuesta es JSON
header('Content-Type: application/json');

// Obtener datos de la solicitud
$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);


$nombre = $decodedData['Nombre'] ?? null;
$correo = $decodedData['Correo'] ?? null;
//$contraseña = password_hash($data->Contraseña, PASSWORD_DEFAULT); // Asegúrate de almacenar contraseñas de manera segura
$contraseña = $decodedData['Contraseña'] ?? null;
$telefono = $decodedData['Telefono'] ?? null;
$role = "cliente";
$direccion = $decodedData['Direccion'] ?? null;
$metodo_pago = $decodedData['MetodoPago'] ?? null;

// Verificar si el correo ya existe
$sql = "SELECT * FROM users WHERE email = '$correo'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["Message" => "El correo ya está registrado."]);
    exit;
}

// Insertar el nuevo usuario en la base de datos
$stmt = $conn->prepare("INSERT INTO users (name, email, password, telephone, role, address, payment) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nombre, $correo, $contraseña, $telefono, $role, $direccion, $metodo_pago);

if ($stmt->execute()) {
    echo json_encode(["Message" => "Registro exitoso."]);
} else {
    echo json_encode(["Message" => "Error al registrar: " . $stmt->error]);
}

$stmt->close();

?>
