import 'dotenv/config';
import * as joi from 'joi';

interface EnvTemplate {
    PORT: number;
    DATABASE_URL: string;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
})
.unknown(true);

const {value, error} = envSchema.validate(process.env);

if (error) {
    throw new Error(`Error en la validación de variables de entorno en ProductosMS ${error.message}`);
}

const envVars: EnvTemplate = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
}