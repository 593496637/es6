#!/usr/bin/env node
const path = require('path');
const config = require(path.resolve(
  process.cwd(),
  'examples/tinypack.config.js'
));
const Compiler = require('../core/Compiler');

(async () => {
  const compiler = new Compiler(config);
  compiler.run();
})();
