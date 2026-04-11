## Client Gateway
Es el punto de comunicación entre nuestros clientes y servicios. Es el encargado de
recibir peticiones, enviarlas a los servicios correspondientes y devolver la
respuesta al cliente

## Dev

1. Clonar el repositorio
2. Instalar dependencias ``npm install``
3. Copiar el ``.env.template`` y renombrar la copia a ``.env``
4. Tener levantados los microservicios que se van a consumir
5. Levantar este client gateway con ``npm run start:dev``

## Nats
```
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```