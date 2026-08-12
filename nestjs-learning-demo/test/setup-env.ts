process.env.NODE_ENV = 'test';
process.env.DB_PATH = ':memory:';
process.env.DB_MIGRATIONS_RUN = 'true';
process.env.JWT_SECRET =
  'test-secret-that-is-definitely-longer-than-32-characters';
process.env.JWT_EXPIRES_IN_SECONDS = '3600';
process.env.JWT_ISSUER = 'taskflow-api-test';
process.env.JWT_AUDIENCE = 'taskflow-client-test';
process.env.BCRYPT_ROUNDS = '4';
process.env.CORS_ORIGINS = 'http://localhost:3001';
process.env.SWAGGER_ENABLED = 'true';
