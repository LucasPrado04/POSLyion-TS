import 'dotenv/config';
import * as joi from 'joi';

interface EnvsTemplate {
    PORT: number;
    DATABASE_URL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
})
.unknown(true);

const {value, error} = envsSchema.validate(process.env);

if(error) {
    throw new Error(`Error en la validación de variables de entorno en Compras-Cabecera-MS ${error.message}`);
}

const envsVars: EnvsTemplate = value;

export const envs = {
    port: envsVars.PORT,
    DATABASE_URL: envsVars.DATABASE_URL,
}