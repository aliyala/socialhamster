import { startServer } from './server';

startServer().catch((error) => {
    console.error('Error starting the server:', error);
});
