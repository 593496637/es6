# 02-refreshable 详细教程

> 目标：理解 “刷新按钮 → jotai atom → loadable 状态变化 → 组件重渲染” 的完整链路。

## 1. 文件角色速记

| 文件 / atom | 作用 |
| --- | --- |
| `requestIdAtom` | 保存“当前请求序号”，初始为 0。只是一个数字状态。 |
| `refreshRequestAtom` | 一个只负责写的 atom，点击按钮时把 `requestIdAtom + 1`。 |
| `asyncRandomAtom` | 异步逻辑：读取 `requestIdAtom`，等 1.2s，再随机成功/失败。 |
| `refreshableRandomAtom` | `loadable(asyncRandomAtom)` 的结果，包含 `state/data/error`。 |
| `RefreshableCount.tsx` | 组件：展示 `state`，并调用 `refreshRequestAtom` 来刷新。 |

## 2. 从“点击刷新”一步步看

1. **用户点击按钮** → 执行 `refresh()`。
2. **`refresh()` 写入 `refreshRequestAtom`**，它把 `requestIdAtom` 改为旧值 + 1。
3. **`asyncRandomAtom` 重新执行**：因为内部写了 `get(requestIdAtom)`，Jotai 记住它依赖这个 atom。一旦 `requestIdAtom` 改变，就会强制 `asyncRandomAtom` 再跑一次 async 函数。
4. **`loadable(asyncRandomAtom)` 更新状态**：重新执行时 `state` 变成 `loading`，等 Promise 结算成功就变成 `hasData`，失败就变成 `hasError`。
5. **组件自动重渲染**：`RefreshableCount` 里用 `useAtomValue(refreshableRandomAtom)` 订阅了这个状态对象，每次 `state` 变化 React 都会重新渲染，于是你看到 UI 自动切换。

> 可选观察：在 `asyncRandomAtom` 里加一行 `console.log('requestId', get(requestIdAtom));`，运行 `pnpm dev` 后打开浏览器控制台，点击“刷新”时日志中的 id 会 +1，就能直观确认依赖关系。

## 3. 为什么要 `get(requestIdAtom)`？

- 在 Jotai 里，只有在 atom 的计算函数里显式 `get(另一个 atom)`，才会把它算作依赖。
- 如果删掉这行，`asyncRandomAtom` 就再也不会感知 `requestIdAtom` 的变化，刷新按钮也就成了摆设。
- 可以类比 Vue/React 里“在 computed/useMemo 里读取依赖”，目的是让系统知道“这个值跟 requestId 有关，requestId 变我就要重新算”。

## 4. loadable 的意义

- `asyncRandomAtom` 返回的是 Promise，直接 `useAtomValue(asyncRandomAtom)` 会抛 Promise，需要用 `<Suspense>`。
- `loadable(asyncRandomAtom)` 把它包装成 `{ state, data?, error? }`，这样组件能像普通数据那样读取 loading / error / data，不用总是写 Suspense。
- 在 `RefreshableCount` 里你看到的 `loading...`、`加载失败...`、`当前数值...` 都是读取这个对象的结果。

## 5. 可以试试的扩展

1. 把 `Math.random() < 0.2` 改成 0.8，体验一下错误分支几乎必然触发的场景。
2. 把 `setTimeout` 改成 300ms 或 3000ms，看看 loading 文案停留时间的区别。
3. 在失败时新增 “重试” 按钮，或在 loading 时禁用刷新按钮，模拟真实产品逻辑。

掌握这些之后，你就能把「刷新按钮 + loadable 状态」搬到真实 API 调用中，明白每次用户操作如何驱动 jotai atom、进而触发组件刷新。若还不理解，按上面的流程对照代码逐步调试，一定能串起来。祝学习顺利！
