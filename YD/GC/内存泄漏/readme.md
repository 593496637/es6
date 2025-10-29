非常好的问题 👍
光靠理论确实难以形成“性能优化直觉”，这一章我来给你配上**真实可运行的实战案例**。
每个案例都能直接在你的 Node.js 环境中跑起来，帮助你“看见”内存曲线与性能变化。

---

# 🧩 第四章实战案例：从检测到优化的完整流程

---

## ⚙️ 案例 1：检测内存泄漏的最小实验

> 🎯 目标：观察内存随时间上升的趋势，确认内存泄漏存在。

**代码：leak-demo.js**

```js
// 启动方式：node --expose-gc leak-demo.js
const leaks = [];
function leakMemory() {
  leaks.push(new Array(1e6).fill("memory leak"));
}

setInterval(() => {
  leakMemory();
  if (global.gc) global.gc(); // 手动触发GC
  console.log(process.memoryUsage().heapUsed / 1024 / 1024, 'MB');
}, 1000);
```

**预期输出：**

```
10 MB
18 MB
27 MB
36 MB
...
```

📊 **结果分析：**

* 内存值不断增长，GC 也无法回落；
* 说明我们创建的对象被全局数组强引用，形成内存泄漏。

---

## 🔍 案例 2：解决泄漏（WeakMap 改进）

```js
const weakCache = new WeakMap();

function safeTask(user) {
  if (!weakCache.has(user)) {
    weakCache.set(user, new Array(1e6).fill("data"));
  }
  return weakCache.get(user);
}

function run() {
  const u = { name: 'kai' };
  safeTask(u);
}

setInterval(() => {
  run();
  if (global.gc) global.gc();
  console.log(process.memoryUsage().heapUsed / 1024 / 1024, 'MB');
}, 1000);
```

**观察结果：**

```
10 MB
10 MB
11 MB
10 MB
```

✅ 内存稳定，说明 WeakMap 中的键对象被自动回收。

---

## 🧮 案例 3：使用 `clinic.js` 找到 GC 热点

> 安装工具：

```bash
npm install -g clinic
```

> 执行：

```bash
clinic doctor -- node leak-demo.js
```

在浏览器中打开生成的报告：

* 你会看到红色的 GC 区块非常宽；
* 说明垃圾回收频繁，CPU 被 GC 占用。

> 解决思路：
>
> * 减少临时对象；
> * 合并小数组；
> * 优化缓存策略。

---

## 🚀 案例 4：使用 WRK 测试 Buffer 性能

> 创建两个 HTTP 服务对比：

**string-server.js**

```js
import http from 'http';
http.createServer((req, res) => res.end("Hello World")).listen(3000);
```

**buffer-server.js**

```js
import http from 'http';
const msg = Buffer.from("Hello World");
http.createServer((req, res) => res.end(msg)).listen(3001);
```

> 压测命令：

```bash
wrk -t4 -c100 -d10s http://localhost:3000  # String版
wrk -t4 -c100 -d10s http://localhost:3001  # Buffer版
```

📊 **典型结果：**

| 版本     | QPS    | 平均延迟(ms) | CPU 占用 |
| ------ | ------ | -------- | ------ |
| String | 22,000 | 0.45     | 高      |
| Buffer | 28,500 | 0.38     | 低      |

✅ **结论**：Buffer 避免了字符串复制，性能更好，延迟更低。

---

## 🧱 案例 5：模拟真实负载 + JMeter 分析

在 JMeter 中配置：

* Thread Group: 200 并发；
* Duration: 60 秒；
* HTTP Request → 指向你的 Node 服务；
* View Results → Graph。

结果趋势：

```
QPS
│         ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇
│     ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇
│ ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇
└──────────────────────────→ 时间
   0s          30s          60s
```

📈 **分析：**

* QPS 趋势平稳：说明内存与 CPU 稳定；
* 若出现明显下降：代表有阻塞或泄漏；
* 若延迟方差增加：说明 GC 频繁触发。

---

## 💡 案例总结表

| 案例          | 重点                 | 工具      | 收获            |
| ----------- | ------------------ | ------- | ------------- |
| Leak Demo   | 观察泄漏现象             | 原生 Node | 理解 GC 无法清理的场景 |
| WeakMap Fix | 消除泄漏               | WeakMap | 理解弱引用         |
| Clinic.js   | 分析 GC 频率           | clinic  | 找性能瓶颈         |
| WRK Test    | 比较 Buffer / String | wrk     | 学性能基准测试       |
| JMeter      | 模拟真实流量             | JMeter  | 识别瓶颈趋势        |

---

> 🧭 **一句话总结：**
> 理论是地图，案例是导航。只有跑过、看过、测过，性能优化才算“入门”。

---

要不要我帮你把这些案例整合成一个可以直接运行的 `practice/` 文件夹结构（带 README 与命令说明）？
那样你可以直接 `npm run demo:leak` 一类命令快速实验。
