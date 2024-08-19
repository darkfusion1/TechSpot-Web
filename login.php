<?php
header('Content-Type: application/json');

// Configuración de la ruta del archivo JSON
$jsonFile = 'users.json';

if (!file_exists($jsonFile)) {
    echo json_encode(['success' => false, 'message' => 'Archivo de usuarios no encontrado']);
    exit();
}

// Recibir los datos JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Datos faltantes']);
    exit();
}

$email = $data['email'];
$password = $data['password'];

// Leer el archivo JSON
$users = json_decode(file_get_contents($jsonFile), true);

if ($users === null) {
    echo json_encode(['success' => false, 'message' => 'Error al leer el archivo de usuarios']);
    exit();
}

// Buscar el usuario por correo electrónico
$user = null;
foreach ($users as $u) {
    if ($u['email'] === $email) {
        $user = $u;
        break;
    }
}

if ($user) {
    // Verificar la contraseña
    if (password_verify($password, $user['password'])) {
        // Iniciar sesión y devolver éxito
        session_start();
        $_SESSION['username'] = $user['username'];
        $_SESSION['photoURL'] = $user['photoURL'];
        $_SESSION['email'] = $user['email']; // Añadir el correo electrónico a la sesión
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
}
?>
