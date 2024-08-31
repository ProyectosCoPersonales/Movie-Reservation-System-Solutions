# Sistema de Reserva de un Cine hecho con Spring Boot, Spring Security, HTML, CSS, JS y JWT
Este es un proyecto propuesto por Roadmap.sh para el backend
## Tecnologías Utilizadas

- **Lenguajes de Programación**: Java, JavaScript, HTML, CSS
- **Frameworks**: Spring Boot
- **Bases de Datos**: PostgreSQL
- **Herramientas de Construcción**: Maven
- **Control de Versiones**: Git
- **Plataforma de Hospedaje**: GitHub
- **Otras tecnologías**: JWT

**Autenticación y Autorización de Usuarios**
Para la autenticación, los usuarios pueden registrarse e iniciar sesión utilizando credenciales de nombre de usuario y contraseña, las cuales se encriptan con bcrypt, una funcionalidad proporcionada por Spring Security. Se implementaron dos roles principales: USER y ADMIN. Cuando una persona se registra por defecto tiene el rol de USER

**RUTA PARA LOGIN:** POST '/auth/login'
**INTERFAZ**

![image](https://github.com/user-attachments/assets/4cfb4627-8f48-4682-b883-ad02474b4b5b)

**RUTA PARA REGISTER** POST '/auth/register'
**INTERFAZ**

![image](https://github.com/user-attachments/assets/18e97dd4-0808-4bd0-9459-93c3d17ded68)


**POSTMAN**

En el login y en el registro la API generará un token, en la imagen se le añadió el username y
el Rol que adquiere por defecto.

Cuando es añadido a la base de datos, la contraseña ya está encriptada.

![image](https://github.com/user-attachments/assets/c03d585a-0b00-4c37-8b4a-15912ee71695)


![image](https://github.com/user-attachments/assets/1954589f-ee09-4582-8e84-6334685ef435)


Usuarios regulares (User): Pueden acceder a funciones básicas como ver películas, sus horarios y realizar reservas.

**RUTA PARA MOSTRAR TODAS LAS PELÍCULAS** GET '/user/movie'

**RUTA PARA VER UNA PELÍCULA** GET '/user/movie/{id}'

**POSTMAN**

![image](https://github.com/user-attachments/assets/2f633131-5626-4462-9b25-44a6a38c2e93)

**INTERFAZ**

La interfaz solo necesita extraer el "id" y el "posterImage" para crear los cards
El id de movies será usado después para las reservaciones.

![image](https://github.com/user-attachments/assets/be2022ea-c854-4f7c-b589-bcdb7bf72bfa)

**CABE ACLARAR QUE FALTO LA INTERFAZ PARA MOSTRAR LAS HORARIOS PERO POR MOMENTO LAS RUTAS EN EL CONTROLADOR ESTÁN HABILITADAS**




Administradores (Admin): Tienen acceso a funciones avanzadas como la gestión de películas y horarios, así como la administración de usuarios y generación de reportes.

