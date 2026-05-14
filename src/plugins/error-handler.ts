import type { FastifyInstance } from 'fastify';

export const registerErrorHandler = (server: FastifyInstance) => {
  server.setErrorHandler((error: any, _request, reply) => {
    server.log.error(error);

    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
      return reply.status(error.statusCode).send({ error: error.message });
    }

    reply.status(500).send({ error: 'Something went wrong' });
  });
};
