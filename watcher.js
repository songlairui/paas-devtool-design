const path = require('path');
const chokidar = require('chokidar');
const resolve = require('resolve');

const confFile = resolve.sync(path.resolve(__dirname, './config'), {
  extensions: ['.js', '.json']
});

const devCookieWatcher = chokidar.watch(path.dirname(confFile), {
  ignored: /(^|[\/\\])\../,
  depth: 0
});

let callback;

devCookieWatcher.on('all', (type, fileName) => {
  console.info('all', type, fileName);
  if (!path.extname(fileName)) return;
  try {
    callback && callback();
  } catch (e) {
    console.warn(e && e.message);
  }
});

module.exports = {
  use(fn) {
    callback = fn;
  }
};
