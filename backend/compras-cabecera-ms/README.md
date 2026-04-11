#Microservicio de Compras-cabecera

## Dev

1. Clonar el repositorio
2. Instalar dependencias ``npm install``
3. Copiar el ``.env.template`` y renombrar la copia a ``.env``
4. Levantar la base de datos ``docker compose up -d``
5. Ejecutar la migración de prisma `npx prisma migrate`
6. Levantar el microservicio con ``npm run start:dev``
