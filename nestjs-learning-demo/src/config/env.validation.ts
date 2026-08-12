import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  DB_PATH: Joi.string().default('data/taskflow.sqlite'),
  DB_MIGRATIONS_RUN: Joi.boolean().default(false),
  JWT_SECRET: Joi.string()
    .min(32)
    .when('NODE_ENV', {
      is: 'production',
      then: Joi.string().invalid(
        'change-this-development-secret-to-at-least-32-characters',
      ),
    })
    .required(),
  JWT_EXPIRES_IN_SECONDS: Joi.number().integer().positive().default(3600),
  JWT_ISSUER: Joi.string().trim().min(1).default('taskflow-api'),
  JWT_AUDIENCE: Joi.string().trim().min(1).default('taskflow-client'),
  BCRYPT_ROUNDS: Joi.number()
    .integer()
    .when('NODE_ENV', {
      is: 'production',
      then: Joi.number().min(10).max(15),
      otherwise: Joi.number().min(4).max(15),
    })
    .default(10),
  CORS_ORIGINS: Joi.string().allow('').default('http://localhost:3001'),
  TRUST_PROXY: Joi.string().trim().allow('').default(''),
  SWAGGER_ENABLED: Joi.boolean().default(false),
});
