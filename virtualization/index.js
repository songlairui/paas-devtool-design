const { targetFolder, patchFolder } = require('./prepare-env');
const { fsMem, fsReal, ufs } = require('./prepare-uni-fs');

require('./chdir')(targetFolder);
require('./combineFs')({ targetFolder, patchFolder, fsMem, fsReal });
require('./patch-require')(ufs);

// require('/Users/songlairui/PaaS/webapp/build/requireModule.js');
// require('/Users/songlairui/PaaS/webapp/build/middleware.js');
