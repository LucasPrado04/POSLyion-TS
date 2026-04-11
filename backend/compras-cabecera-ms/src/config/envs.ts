import 'dotenv/config';
import * as joi from 'joi';

interface EnvsTemplate {
    PORT: number;
    DATABASE_URL: string;
    MICROSERVICIO_PRODUCTO_HOST: string;
    MICROSERVICIO_PRODUCTO_PORT: number;
    NATS_SERVERS: string[];
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    MICROSERVICIO_PRODUCTO_HOST: joi.string().required(),
    MICROSERVICIO_PRODUCTO_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
})
.unknown(true);

const {value, error} = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if(error) {
    throw new Error(`Error en la validación de variables de entorno en Compras-Cabecera-MS ${error.message}`);
}

const envsVars: EnvsTemplate = value;

export const envs = {
    port: envsVars.PORT,
    databaseUrl: envsVars.DATABASE_URL,
    microservicioProductoHost: envsVars.MICROSERVICIO_PRODUCTO_HOST,
    microservicioProductoPort: envsVars.MICROSERVICIO_PRODUCTO_PORT,
    natsServers: envsVars.NATS_SERVERS,
}