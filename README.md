# Mobee

## Pre-requisitos

1. Necesitarás tener Node.js y npm instalados en tu máquina. Puedes descargarlos desde [aquí](https://nodejs.org/es/).

2. También debes tener instalado Prisma. Para instalarlo, utiliza el siguiente comando en tu terminal:

`npm install @prisma/cli -g`

3. Necesitarás tener Docker instalado en tu máquina. Puedes descargarlo desde [aquí](https://www.docker.com/products/docker-desktop).

## Instalación Local

1. Clona el repositorio en tu máquina local utilizando `git clone`.

2. Entra en el directorio del proyecto:

`cd mobee`

3. Instala las dependencias del proyecto:

`npm install`

4. Inicia el servicio de la base de datos con Docker Compose:

`docker compose up -d`

5. Conectar con la base de datos de prisma y generar cliente

`npx prisma db push`

`npm prisma generate`

6. Generar migración schema.prisma

`npx prisma migrate dev`

7. Ejecutar seed.ts para rellenar la bbdd

`npx prisma db seed`

8. Iniciar el Servidor y mostrar el Proyecto en el navegador:

`npm run dev`

Visitar [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado

9. Es posible iniciar sesion con un usuario de prueba con los siguientes credenciales:

- Email: user@example.com
- Password: qwer

10. [EXTRA] Visualizar las tablas de la base de datos desde prisma studio:

`npx prisma studio`
