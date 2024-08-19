# TechSpot Web

TechSpot es un sitio web de comercio electrónico donde los usuarios pueden registrarse, explorar productos, añadirlos al carrito y ver detalles de los productos. 

## Objetivo

Desarrollar una plataforma de comercio electrónico simple que permita a los usuarios registrarse, iniciar sesión, explorar un catálogo de productos, añadir productos al carrito y gestionar su perfil.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- JSON para almacenamiento de usuarios

## Estructura del Proyecto

- `/img` - Contiene imágenes utilizadas en el sitio web.
- `index.html` - Página principal.
- `catalog.html` - Página de catálogo de productos.
- `product.html` - Página de productos.
- `product-details.html` - Página de detalles del producto.
- `cart.html` - Página del carrito de compras.
- `login.html` - Página de inicio de sesión.
- `register.html` - Página de registro de usuario.
- `profile.html` - Página de perfil del usuario.
- `contact.html` - Página de contacto.
- `styles.css` - Archivo de estilos.
- `script.js` - Archivo JavaScript para funcionalidades.
- `login.php` - Script PHP para iniciar sesión.
- `register.php` - Script PHP para registrar usuarios.
- `logout.php` - Script PHP para cerrar sesión.
- `get_user.php` - Script PHP para obtener datos de usuario.
- `delete_user.php` - Script PHP para eliminar un usuario.
- `users.json` - Archivo JSON que contiene datos de usuarios.

## Instrucciones de Instalación

1. Clona el repositorio: `git clone https://github.com/tuusuario/TechSpot-Web.git`
2. Configura tu servidor local (XAMPP o similar) para que soporte PHP.
3. Asegúrate de que los archivos PHP puedan leer y escribir en `users.json`.

## Uso

Para interactuar con todas las funcionalidades del sitio, debes seguir estos pasos:

1. **Registro**:
   - Regístrate en `register.html` para crear una cuenta de usuario.
2. **Inicio de Sesión**:
   - Inicia sesión en `login.html` con tu cuenta registrada.
3. **Navegación**:
   - **Catálogo**: Explora productos en `catalog.html`.
   - **Detalles del Producto**: Ve los detalles de un producto en `product-details.html`.
   - **Carrito de Compras**: Añade productos al carrito en `cart.html`.
   - **Perfil**: Consulta y edita tu perfil en `profile.html`, y elimina tu cuenta si lo deseas.

**Nota**: La mayoría de las funcionalidades, como la visualización del catálogo y la adición de productos al carrito, requieren que estés registrado e iniciado sesión. Sin una cuenta activa, no podrás acceder a estas funcionalidades.

## Desafíos y Soluciones

- **Problema**: La autenticación y gestión de usuarios con JSON en lugar de una base de datos SQL.
  - **Solución**: Implementé scripts PHP para manejar el registro, inicio de sesión y gestión de usuarios con el archivo `users.json`.

- **Problema**: Sincronización entre el carrito de compras y la visualización en la página.
  - **Solución**: Utilicé JavaScript para actualizar el carrito en tiempo real y PHP para manejar la lógica del servidor.

## Documentación Adicional

Para más detalles, consulta los archivos `CONTRIBUTING.md` y otros documentos en la carpeta raíz.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
