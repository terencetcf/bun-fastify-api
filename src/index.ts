import { buildApp } from './app';

const port = Number(process.env.API_PORT) || 3000;
const server = buildApp();

const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    try {
      await server.close();
      server.log.error(`Closed application on ${signal}`);
      process.exit(0);
    } catch (err) {
      server.log.error({ err }, `Error closing application on ${signal}`);
      process.exit(1);
    }
  });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

try {
  await server.listen({
    port,
  });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}

export { server };
