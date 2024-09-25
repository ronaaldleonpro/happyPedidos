<?php
// Mostrar todos los errores PHP (solo en desarrollo, para producción, desactiva esto)
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

// Configuración de la conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "happyPedidos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Limpiar el buffer de salida para evitar contenido no deseado en la respuesta JSON
ob_clean();

// Establecer encabezado para indicar que la respuesta es JSON
header('Content-Type: application/json');

// Obtener datos de la solicitud
$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);

if ($decodedData === null) {
    echo json_encode(array("Message" => "Error: datos JSON inválidos"));
    exit();
}

$UserEmail = $decodedData['Email'] ?? null;
$UserPW = $decodedData['Password'] ?? null;

// Asegurarse de que ambos campos existan antes de procesar
if (empty($UserEmail) || empty($UserPW)) {
    echo json_encode(array("Message" => "Email o contraseña faltantes"));
    exit();
}

// Preparar sentencia SQL para evitar inyección
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $UserEmail);
$stmt->execute();
$result = $stmt->get_result();
$checkEmail = $result->num_rows;

if ($checkEmail != 0) {
    $user = $result->fetch_assoc();

    // Comparar contraseñas directamente (sin hash, pero en producción usa hash)
    if ($user['password'] != $UserPW) {
        // Contraseña incorrecta
        echo json_encode(array("Message" => "Contraseña incorrecta"));
    } else {
        // Inicio de sesión exitoso
        echo json_encode(array("Message" => "Inicio de sesión exitoso"));
    }
} else {
    // Correo no registrado
    echo json_encode(array("Message" => "Correo no registrado"));
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>
