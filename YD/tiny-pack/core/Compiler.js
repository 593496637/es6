const fs = require('fs');
const path = require('path');
const HookSystem = require('./HookSystem');
const Compilation = require('./Compilation'); // 暂未实现，先留着引用

class Compiler {
  constructor(config) {
    this.config = config;
    this.hooks = new HookSystem().hooks;

    // 注册插件
    if (config.plugins && Array.isArray(config.plugins)) {
      config.plugins.forEach((plugin) => plugin.apply(this));
    }
  }

  run() {
    // 1️⃣ 触发 run 阶段
    this.hooks.run.call();
    console.log('[run] 构建开始...');

    // 2️⃣ 创建 Compilation 实例并执行构建
    const compilation = new Compilation(this.config);
    compilation.build().then(() => {
      // 3️⃣ emit 阶段：生成输出文件
      this.hooks.emit.promise().then(() => {
        // 写出 bundle
        const outputFile = path.join(
          this.config.output.path,
          this.config.output.filename
        );
        fs.writeFileSync(outputFile, compilation.bundleCode, 'utf-8');
        console.log(`[emit] 已输出到 ${outputFile}`);

        // 4️⃣ done 阶段
        this.hooks.done.call();
        console.log('[done] ✅ 构建完成');
      });
    });
  }
}

module.exports = Compiler;
