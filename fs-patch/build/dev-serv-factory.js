const config = require('../config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}
const opn = require('opn');
const path = require('path');
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');

const argv = require('./argv').argv;
const devRouter = require('./serv/dev-router');
const IP = require('./helper').IP();

// default port where dev server listens for incoming traffic
const port = process.env.PORT || argv.port || config.dev.port;
const uri = 'http://' + IP + ':' + port;

// automatically open browser, if not set will be false
const autoOpenBrowser = config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

let httpServer;

module.exports = async function overwriteHttpServer({
  proxyTarget,
  devMiddleware,
  hotMiddleware
}) {
  const paramsCheck = Object.entries({ hotMiddleware, devMiddleware }).reduce(
    (err, [key, v]) => (v || err.push(key), err),
    []
  );
  if (paramsCheck.length) {
    throw new Error(`overwriteHttpServer 缺少参数 ${paramsCheck.join()}`);
  }
  const serving = !!httpServer;
  const app = express();
  app.use('/api', devRouter);

  // proxy api requests
  Object.keys(proxyTable).forEach(function(context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options };
    }
    // 合并 proxyTarget
    if (proxyTarget) {
      options.target = proxyTarget;
    }
    app.use(proxyMiddleware(options.filter || context, options));
  });

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')());

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  // serve pure static assets
  const staticPath = path.posix.join(
    config.dev.assetsPublicPath,
    config.dev.assetsSubDirectory
  );
  app.use(staticPath, express.static('./static'));

  if (serving) {
    console.info('shutdown prev httpServer');
    httpServer.close();
  }

  await new Promise((resolve, reject) => {
    httpServer = app.listen(port, function(err) {
      if (err) {
        reject(err);
        return;
      }
      if (
        !serving &&
        autoOpenBrowser &&
        argv.devmode !== 'app' &&
        process.env.NODE_ENV !== 'testing'
      ) {
        opn(uri);
      }
      resolve();
    });
  });
  return httpServer;
};
