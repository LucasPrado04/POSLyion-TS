# Dev

1. Clonar el repositorio
2. Crear un .env basado en el .env.template
3. Registrarse en [Stripe](https://stripe.com) para obtener las API Keys necesarias
4. Colocar las API Keys de Stripe en el archivo `.env`. Se deja como comentario en el `env.template` el link donde se puede obtener cada key.
5. Instalar y configurar Hookdeck CLI para mantener un webhook escuchando en el localhost. [Link a la documentación de Hookdeck](https://dashboard.hookdeck.com/get-started), y crear una [nueva conexión](https://dashboard.hookdeck.com/connections/new) como "source type" a Stripe, "destination type" como CLI, "destination name" puede ser to-localhost, y CLI-Path como "/payments/webhook"
6. Correr el comando `hookdeck listen ${PORT} stripe --path /payments/webhook`.
7. Ejecutar el comando `docker compose up --build` en el directorio raíz "backend/"
8. Usar algún cliente como Insomnia para disparar un evento para crear una sesión de pago y probar si se recibe el evento.