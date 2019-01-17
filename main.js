const path = require('path');
const { targetFolder } = require('./virtualization');
const watcher = require('./watcher');

const requireNoCache = function(filePath) {
  delete require.cache[require.resolve(filePath)];
  return require(filePath);
};

const start = require(path.resolve(targetFolder, 'build/start-serve.js'));

watcher.use(() => {
  const { proxyTarget } = requireNoCache('./config') || {};
  start(proxyTarget);
});
