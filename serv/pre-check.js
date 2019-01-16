require('engine-mobile/build/check-versions')();
const config = require('engine-mobile/config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}
const path = require('path');
const argv = require('engine-mobile/build/argv').argv;
const utils = require('engine-mobile/build/utils');
if (argv.devmode === 'app') {
  utils.mkdirIfNotExists(path.join(__dirname, '../static'));
}

if (config.isUnderNodeModules) {
  [
    ['.babelrc'],
    ['index.html', 'index-dev.html'],
    ['index-app-dev.html']
  ].forEach(function(files) {
    utils.copy(
      path.join(__dirname, '../node_modules/engine-mobile', files[0]),
      path.join(__dirname, '..', files[1] || files[0]),
      true
    );
  });
}
