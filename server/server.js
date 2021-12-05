const jsonServer = require('json-server');
const { initDatabase } = require('./database/database');
const { initCustomRoutes } = require('./routes/routes');

const PORT = process.env.PORT || 3001;

const server = jsonServer.create();
const router = jsonServer.router(initDatabase());
const middlewares = jsonServer.defaults({
  static: './build',
});

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  }),
);

server.use(jsonServer.bodyParser);

initCustomRoutes(server);

server.use(router);

server.listen(PORT, () => {
  console.log('JSON Server is running');
});
