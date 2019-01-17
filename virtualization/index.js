const { targetFolder, patchFolder } = require('./prepare-env');
const { fsMem, fsReal, ufs } = require('./prepare-uni-fs');

require('./chdir')(targetFolder);
require('./combineFs')({ targetFolder, patchFolder, fsMem, fsReal });
require('./patch-require')(ufs);

module.exports = { targetFolder, patchFolder, fsMem, fsReal, ufs };
