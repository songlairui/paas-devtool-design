const fs = require('fs');
const path = require('path');

function traverse(dir, cb) {
  fs.readdirSync(dir).forEach((file) => {
    const srcPath = path.resolve(dir, file);
    const stat = fs.statSync(srcPath);
    const isDir = stat.isDirectory();
    const goNext = cb && cb({ isDir, srcPath });
    if (goNext !== false && isDir) {
      traverse(srcPath, cb);
    }
  });
}

module.exports = { traverse };
