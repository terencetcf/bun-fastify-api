import helmet from '@fastify/helmet';
import type { FastifyInstance } from 'fastify';

export const registerHelmet = (server: FastifyInstance) => {
  return server.register(helmet);
};
