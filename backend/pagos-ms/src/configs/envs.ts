import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    STRIPE_TESTING_SECRET_KEY: string;
    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
    STRIPE_ENDPOINT_SECRET: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    STRIPE_TESTING_SECRET_KEY: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(), 
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
})
    .unknown(true)

const { value, error } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Error en la validación de variables de entorno en pagos-ms ${error}`)
}

export const envVars: EnvVars = value

export const envs = {
    port: envVars.PORT,
    stripeTestingSecretKey: envVars.STRIPE_TESTING_SECRET_KEY,
    stripeSuccesUrl: envVars.STRIPE_SUCCESS_URL,
    stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
    stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
}