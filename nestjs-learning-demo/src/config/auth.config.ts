import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresInSeconds: Number(process.env.JWT_EXPIRES_IN_SECONDS ?? 3600),
  jwtIssuer: process.env.JWT_ISSUER ?? 'taskflow-api',
  jwtAudience: process.env.JWT_AUDIENCE ?? 'taskflow-client',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 10),
}));
