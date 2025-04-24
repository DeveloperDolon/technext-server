async function bootstrap() {
  const app = await import('./app.js');
  const server = await app.createServer();
  await server.start();
  console.log('Server is running on http://localhost:4000');
}