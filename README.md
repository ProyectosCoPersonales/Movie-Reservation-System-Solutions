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


#Usuarios regulares (User)

Pueden acceder a funciones básicas como ver películas, sus horarios y realizar reservas.

**RUTA PARA MOSTRAR TODAS LAS PELÍCULAS** GET '/user/movie'

**RUTA PARA VER UNA PELÍCULA** GET '/user/movie/{id}'

**POSTMAN**

![image](https://github.com/user-attachments/assets/2f633131-5626-4462-9b25-44a6a38c2e93)

**INTERFAZ**

La interfaz solo necesita extraer el "id" y el "posterImage" para crear los cards
El id de movies será usado después para las reservaciones.


![image](https://github.com/user-attachments/assets/ec339aeb-8381-4f07-825c-0ecdcb91be15)


**CABE ACLARAR QUE FALTO LA INTERFAZ PARA MOSTRAR LAS HORARIOS PERO POR MOMENTO LAS RUTAS EN EL CONTROLADOR ESTÁN HABILITADAS**

**RUTA PARA VER LOS HORARIOS** GET '/admin/horario' Por el momento es una función de usuario ADMIN

**RUTA PARA VER LAS RESERVACIONES** GET '/user/reservation'

**RUTA PARA HACER UNA RESERVACIÓN** POST '/{horarioid}/add-seats' Cada horario está compuesto de una película, un horario y una sala de cine y se creo la entidad reservations para administrar
los asientos para cada película.     

**RUTA PARA HACER UNA RESERVACIÓN** GET '/{horarioid}/occupied-seats' 

![image](https://github.com/user-attachments/assets/e68d5e47-e013-4a9a-a83f-cabdcf2685f2)

Se pensaba mejorar el sistema de facturación pero por falta de tiempo se quedó así, pero los asientos quedan reservados y bloqueados por lo tanto no pueden volverse a seleccionar
Utiliza horarioId para tener un espacio exclusivo para cada función de Cine.

![image](https://github.com/user-attachments/assets/7ede1caf-0dc7-472c-ac06-ab65742ed647)

![image](https://github.com/user-attachments/assets/13474aa6-f001-4312-8616-346d1b6a74c8)

![image](https://github.com/user-attachments/assets/85c5c34a-891b-4b0c-9efe-dc2b36a21367)

**TODOS LAS RESERVACIONES SE AÑADIERON EXISTOSAMENTE**

![image](https://github.com/user-attachments/assets/e9b04078-f379-411b-9d0b-2af4236360a8)


#Administradores (Admin)

Tienen acceso a funciones avanzadas como la gestión de películas y horarios, así como la administración de usuarios y generación de reportes.

**AHORA SI ALGUIEN INICIA SESIÓN CON UN USUARIO ADMIN**

Tiene una serie de rutas las cuales puede usar para manipular los registros de la base de datos, tanto de los usuarios, películas, horarios y
salas de cine. El admin tiene todos los permisos puede GET, POST, DELETE y buscar registros por el ID.

**RUTAS ADMIN**


![image](https://github.com/user-attachments/assets/587be1bc-e70d-4e5f-855a-98bb82b17d40)


![image](https://github.com/user-attachments/assets/cc34f9f6-e600-482e-9032-7dd40614a787)


![image](https://github.com/user-attachments/assets/ba5f04c9-00e2-431d-929d-d00e9cc99594)


![image](https://github.com/user-attachments/assets/2b2e8402-e8e9-42fe-9edb-a66fdb0dcc6d)

