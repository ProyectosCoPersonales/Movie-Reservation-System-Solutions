# Sistema de Reserva de un Cine hecho con Spring Boot, Spring Security, HTML, CSS, JS
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

**POSTMAN**
TANTO PARA EL REGISTRO COMO PARA EL LOGIN LA RUTA DEVOLVERÁ UN TOKEN QUE CONTENDRÁ EL NOMBRE DEL
USUARIO Y SU ROL PARA EL EJEMPLO, SE LE AÑADIO LAS CREEDENCIALES POR DEFECTO QUE ADQUIERE UNA
PERSONA AL REGISTRARSE.

![image](https://github.com/user-attachments/assets/1954589f-ee09-4582-8e84-6334685ef435)

**RUTA PARA REGISTER** POST '/auth/register'
**INTERFAZ**

![image](https://github.com/user-attachments/assets/18e97dd4-0808-4bd0-9459-93c3d17ded68)


Usuarios regulares (User): Pueden acceder a funciones básicas como ver películas, sus horarios y realizar reservas.

Administradores (Admin): Tienen acceso a funciones avanzadas como la gestión de películas y horarios, así como la administración de usuarios y generación de reportes.

