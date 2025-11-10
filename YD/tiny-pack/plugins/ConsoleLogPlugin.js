class ConsoleLogPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('ConsoleLogPlugin', () => {
      console.log('[plugin] 构建准备开始');
    });

    compiler.hooks.emit.tapPromise('ConsoleLogPlugin', async () => {
      console.log('[plugin] 正在生成输出...');
    });

    compiler.hooks.done.tap('ConsoleLogPlugin', () => {
      console.log('[plugin] 构建流程结束 🎉');
    });
  }
}

module.exports = ConsoleLogPlugin;
