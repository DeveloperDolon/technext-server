import { Server } from 'http';
import app from './app';
import config from './app/config';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: Error) => {
    console.error('Unexpected error:', error);
    exitHandler();
  };
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}
bootstrap();
