const path = require('path');
const { targetFolder } = require('./virtualization');

require(path.resolve(targetFolder, 'build/start-serve.js'));
