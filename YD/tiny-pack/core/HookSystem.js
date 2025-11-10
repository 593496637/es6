const { SyncHook, AsyncSeriesHook } = require('tapable');

/**
 * HookSystem 用于统一管理构建生命周期的所有钩子
 */
class HookSystem {
  constructor() {
    this.hooks = {
      run: new SyncHook(), // 编译开始
      emit: new AsyncSeriesHook(), // 输出前
      done: new SyncHook(), // 编译完成
    };
  }
}

module.exports = HookSystem;
