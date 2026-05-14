import fastify from 'fastify';
import usersRoutes from './features/users/users.routes';
import { registerCors } from './plugins/cors';
import { registerErrorHandler } from './plugins/error-handler';
import { registerHelmet } from './plugins/helmet';
import { healthCheck } from './shared/health/health-check';

export const buildApp = () => {
  const server = fastify({
    logger: true,
  });

  registerCors(server);
  registerHelmet(server);

  server.register(usersRoutes, { prefix: '/api/user' });

  registerErrorHandler(server);

  server.get('/health', async (_request, reply) => {
    try {
      await healthCheck();
      reply.status(200).send({
        message: 'Health check endpoint success.',
      });
    } catch (e) {
      reply.status(500).send({
        message: 'Health check endpoint failed.',
      });
    }
  });

  server.get('/', (_request, reply) => {
    reply.status(200).send({ message: 'Hello from fastify boilerplate!!' });
  });

  return server;
};
