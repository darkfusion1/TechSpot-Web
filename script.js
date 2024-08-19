// Función para leer el archivo JSON
function readJSONFile(filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al leer el archivo JSON');
            }
            return response.json();
        });
}

// Función para guardar datos en el archivo JSON (simulado)
function writeJSONFile(filePath, data) {
    return fetch(filePath, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al guardar los datos');
        }
        return response.json();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado y analizado.');

    // Lógica para cargar el nombre de usuario y foto de perfil desde el archivo JSON
    const navLinks = document.getElementById('nav-links');
    
    // Limpiar contenido previo del menú de navegación
    navLinks.innerHTML = '';

    readJSONFile('users.json').then(users => {
        console.log('Datos de usuarios cargados:', users);

        // Suponiendo que tenemos una manera de identificar el usuario actual
        const currentUser = users.find(user => user.email && user.isLoggedIn); // Asegúrate de tener una propiedad isLoggedIn

        if (currentUser) {
            // Foto de perfil fija
            const photoURL = 'img/fotoperfil.png';
            navLinks.innerHTML = `
                <li class="nav-item"><a class="nav-link" href="catalog.html">Catálogo</a></li>
                <li class="nav-item"><a class="nav-link" href="cart.html">Carrito</a></li>
                <li class="nav-item">
                    <a class="nav-link" href="profile.html">
                        <img src="${photoURL}" alt="${currentUser.username}" style="width:30px; height:30px; border-radius:50%; object-fit:cover;">
                        ${currentUser.username}
                    </a>
                </li>
                <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Salir</a></li>
            `;
            console.log('Elementos de usuario agregados al menú de navegación.');
        } else {
            navLinks.innerHTML = `
                <li class="nav-item"><a class="nav-link" href="login.html">Ingresar</a></li>
                <li class="nav-item"><a class="nav-link" href="register.html">Registro</a></li>
            `;
        }
    }).catch(error => {
        console.error('Error al cargar los datos de usuarios:', error);
    });

    function logout() {
        // Aquí debes actualizar la propiedad `isLoggedIn` de los usuarios en `users.json`
        readJSONFile('users.json').then(users => {
            const updatedUsers = users.map(user => ({
                ...user,
                isLoggedIn: false
            }));

            writeJSONFile('users.json', updatedUsers).then(() => {
                window.location.href = 'index.html';
            }).catch(error => {
                console.error('Error al cerrar sesión:', error);
            });
        }).catch(error => {
            console.error('Error al leer los usuarios:', error);
        });
    }

    // Manejo del formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log('Intento de inicio de sesión con:', email, password);

            fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor de inicio de sesión:', data);
                if (data.success) {
                    alert(data.message); // Muestra el mensaje de éxito

                    // Actualizar la información del usuario en users.json
                    readJSONFile('users.json').then(users => {
                        const updatedUsers = users.map(user => ({
                            ...user,
                            isLoggedIn: user.email === email ? true : user.isLoggedIn
                        }));

                        writeJSONFile('users.json', updatedUsers).then(() => {
                            setTimeout(() => {
                                window.location.href = 'index.html';
                            }, 1500); // Redirige a index.html después de 1.5 segundos
                        }).catch(error => {
                            console.error('Error al guardar los datos del usuario:', error);
                        });
                    }).catch(error => {
                        console.error('Error al leer los usuarios:', error);
                    });
                } else {
                    alert("Credenciales incorrectas. Por favor, intenta nuevamente.");
                }
            })
            .catch(error => {
                console.error('Error en la solicitud de inicio de sesión:', error);
                alert('Hubo un error en el inicio de sesión. Intenta nuevamente.');
            });
        });
    }

    // Manejo del formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log('Intento de registro con:', username, email, password);

            fetch('register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor de registro:', data);
                if (data.success) {
                    readJSONFile('users.json').then(users => {
                        const updatedUsers = [...users, {
                            username: username,
                            email: email,
                            password: password, // Considera cifrar la contraseña antes de guardarla
                            photoURL: 'img/fotoperfil.png', // Ruta fija para la foto de perfil
                            isLoggedIn: false
                        }];

                        writeJSONFile('users.json', updatedUsers).then(() => {
                            window.location.href = 'index.html';
                        }).catch(error => {
                            console.error('Error al guardar los datos del usuario:', error);
                        });
                    }).catch(error => {
                        console.error('Error al leer los usuarios:', error);
                    });
                } else {
                    alert(data.message || 'Hubo un error en el registro. Intenta nuevamente.');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud de registro:', error);
                alert('Hubo un error en el registro. Intenta nuevamente.');
            });
        });
    }
});
