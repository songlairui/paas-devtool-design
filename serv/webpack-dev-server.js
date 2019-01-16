const config = require('engine-mobile/config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}
const webpack = require('webpack');
const argv = require('engine-mobile/build/argv').argv;
const IP = require('engine-mobile/build/helper').IP();
// default port where dev server listens for incoming traffic
const port = process.env.PORT || argv.port || config.dev.port;
const uri = 'http://' + IP + ':' + port;

const webpackConfig =
  process.env.NODE_ENV === 'testing'
    ? require('engine-mobile/build/webpack.prod.conf')
    : require('engine-mobile/build/webpack.dev.conf');
Object.keys(webpackConfig.resolve.alias).forEach(key => {
  const val = webpackConfig.resolve.alias[key];
  webpackConfig.resolve.alias[key] = val.replace(
    '/Users/songlairui/PaaS/webapp/',
    '/Users/songlairui/PaaS/devtool/'
  );
});
console.info('we', webpackConfig.resolve);
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: function() {
    //
  }
});

compiler.plugin('done', function() {
  console.log('> Listening at ' + uri + '\n');
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

module.exports = {
  devMiddleware,
  hotMiddleware
};
