const fs = require('fs');
const path = require('path');
const Parser = require('./Parser');
const LoaderRunner = require('./LoaderRunner');
const bundler = require('./bundler');

class Compilation {
  constructor(config) {
    this.config = config;
    this.modules = [];
  }

  async build() {
    const entryPath = this.config.entry;
    const entryModule = await this.buildModule(entryPath);
    this.modules.push(entryModule);

    for (const mod of this.modules) {
      for (const dep of mod.deps) {
        if (!this.modules.find((m) => m.filename === dep)) {
          const depAbsPath = path.resolve(process.cwd(), dep);
          const depModule = await this.buildModule(depAbsPath);
          this.modules.push(depModule);
        }
      }
    }

    this.bundleCode = bundler(this.modules, entryModule.filename);
  }

  async buildModule(filename) {
    let source = fs.readFileSync(filename, 'utf-8');
    const relId =
      './' + path.relative(process.cwd(), filename).replace(/\\/g, '/');

    const { rules } = this.config.module || {};
    if (rules) {
      for (const rule of rules) {
        if (rule.test.test(filename)) {
          const runner = new LoaderRunner(rule.use);
          source = await runner.runLoaders(source);
        }
      }
    }

    const parser = new Parser();
    const { transformedCode, deps } = parser.parse(
      source,
      path.dirname(filename)
    );

    return { filename: relId, code: transformedCode, deps };
  }
}

module.exports = Compilation;
