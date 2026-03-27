import 'dotenv/config';
import * as joi from 'joi';

interface EnvsTemplate {
    PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
})
.unknown(true);

const {value, error} = envsSchema.validate(process.env);

if(error) {
    throw new Error(`Error en la validación de variables de entorno en Compras-Cabecera-MS ${error.message}`);
}

const envsVars: EnvsTemplate = value;

export const envs = {
    port: envsVars.PORT,
}