import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    MICROSERVICIO_USUARIO_HOST: string;
    MICROSERVICIO_USUARIO_PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    MICROSERVICIO_USUARIO_HOST: joi.string().required(),
    MICROSERVICIO_USUARIO_PORT: joi.number().required(),
})
.unknown(true)

const {error, value} = envSchema.validate(process.env);

if (error) {
    throw new Error(`Error en la validación de variables de entorno ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    microservicioUsuarioHost: envVars.MICROSERVICIO_USUARIO_HOST,
    microservicioUsuarioPort: envVars.MICROSERVICIO_USUARIO_PORT,
}