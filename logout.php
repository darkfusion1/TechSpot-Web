<?php
    session_start();
    session_destroy(); // Destruir la sesión

    // Limpiar localStorage y redirigir al login
    echo "<script>
        localStorage.clear();
        window.location.href = 'login.html';
    </script>";
?>
