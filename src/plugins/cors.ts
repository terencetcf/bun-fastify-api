import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';

export const registerCors = (server: FastifyInstance) => {
  return server.register(cors);
};
