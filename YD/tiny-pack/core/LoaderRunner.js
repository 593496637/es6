const path = require('path');

/**
 * LoaderRunner
 * 负责执行一条 loader 链，从右到左依次调用。
 */
class LoaderRunner {
  constructor(loaders) {
    this.loaders = Array.isArray(loaders) ? loaders : [loaders];
  }

  /**
   * 执行所有 loaders
   * @param {string} source 文件原始内容
   * @returns 转换后的源码
   */
  async runLoaders(source) {
    let code = source;

    // 从右往左依次执行
    for (let i = this.loaders.length - 1; i >= 0; i--) {
      const loaderPath = this.loaders[i];
      const loader = require(path.resolve(loaderPath));

      // 支持同步和异步 loader
      const result = await Promise.resolve(loader(code));
      code = result;
    }

    return code;
  }
}

module.exports = LoaderRunner;
