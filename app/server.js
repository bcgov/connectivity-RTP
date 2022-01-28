import next from 'next';
import initExpresss from './backend/express-server.js';
import createServer from './backend/create-server.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const expressServer = await initExpresss();

  // catch all other routes and return the index file
  expressServer.all('*', async (req, res) => handle(req, res));

  createServer(expressServer);
});
