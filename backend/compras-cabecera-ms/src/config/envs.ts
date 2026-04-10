import 'dotenv/config';
import * as joi from 'joi';

interface EnvsTemplate {
    PORT: number;
    DATABASE_URL: string;
    MICROSERVICIO_PRODUCTO_HOST: string;
    MICROSERVICIO_PRODUCTO_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    MICROSERVICIO_PRODUCTO_HOST: joi.string().required(),
    MICROSERVICIO_PRODUCTO_PORT: joi.number().required(),
})
.unknown(true);

const {value, error} = envsSchema.validate(process.env);

if(error) {
    throw new Error(`Error en la validación de variables de entorno en Compras-Cabecera-MS ${error.message}`);
}

const envsVars: EnvsTemplate = value;

export const envs = {
    port: envsVars.PORT,
    databaseUrl: envsVars.DATABASE_URL,
    microservicioProductoHost: envsVars.MICROSERVICIO_PRODUCTO_HOST,
    microservicioProductoPort: envsVars.MICROSERVICIO_PRODUCTO_PORT,
}