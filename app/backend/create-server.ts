import Debug from 'debug';
import { createServer as _createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

const debug = Debug('seq:server');
const hostname = process.env.ORIGIN || '0.0.0.0';
const port = normalizePort(process.env.PORT || 3000);

const createServer = (expressServer, lightship) => {
  expressServer.set('port', port);

  const server = _createServer(expressServer);

  server.listen(port, hostname, () => {
    lightship.signalReady();
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  server.on('error', onError);
  server.on('listening', onListening);

  function onError(error) {
    if (error.syscall !== 'listen') {
      lightship.shutdown();
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);

      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);

      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind =
      typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
};

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export default createServer;
