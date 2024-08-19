<?php
session_start();
header('Content-Type: application/json');

// Verifica si el usuario está conectado
if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'No se ha iniciado sesión']);
    exit();
}

// Configuración de la ruta del archivo JSON
$jsonFile = 'users.json';

if (!file_exists($jsonFile)) {
    echo json_encode(['success' => false, 'message' => 'Archivo de usuarios no encontrado']);
    exit();
}

// Leer el archivo JSON
$users = json_decode(file_get_contents($jsonFile), true);

if ($users === null) {
    echo json_encode(['success' => false, 'message' => 'Error al leer el archivo de usuarios']);
    exit();
}

// Eliminar el usuario correspondiente
$username = $_SESSION['username'];
$updatedUsers = array_filter($users, function($user) use ($username) {
    return $user['username'] !== $username;
});

// Guardar los usuarios actualizados
if (file_put_contents($jsonFile, json_encode(array_values($updatedUsers)))) {
    // Eliminar la sesión
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Cuenta eliminada']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar la cuenta']);
}
?>
