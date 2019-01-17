require('./check-versions')();

const { devMiddleware, hotMiddleware } = require('./middleware.js');

const overwriteHttpServer = require('./dev-serv-factory');

async function start() {
  const httpServer = await overwriteHttpServer({
    devMiddleware,
    hotMiddleware
  });
  console.info('listening', httpServer.info);
}

process.on('uncaughtException', function(err) {
  if (err.code === 'EADDRINUSE') {
    console.error('port is in used');
  } else {
    console.error(err);
  }
  process.exit();
});

start();
