# Loadable 学习路径

> 这些示例文件夹不会自动接入 `src/App.tsx`，需要时手动引入，方便在 IDE 中按阶段练习。

## 01-basic 基础示例

- `atoms.ts`：构建一个最简单的异步 atom，并用 `loadableRandomAtom` 展示 `state / data / error` 三种状态。
- `LoadableAsyncCount.tsx`：最小可运行组件，直观展示 loadable 的不同渲染分支。

## 02-refreshable 可刷新示例

- `atoms.ts`：在基础示例上叠加 `requestIdAtom`，结合 `refreshRequestAtom` 手动触发请求，并加入 20% 的失败概率以练习错误态。
- `RefreshableCount.tsx`：展示如何点击按钮刷新 loadable 的值，并根据状态输出不同文案。

## 03-storage-family 持久化 + 多实例示例

- `atoms.ts`：使用 `atomWithStorage` 保存代办列表，再借助 `atomFamily` 为每个代办生成独立的 atom。
- `TodoListDemo.tsx`：列表组件读取全部代办并渲染多个 `TodoItem`，勾选复选框即可更新单条记录，同时自动写回 localStorage。

### 使用方式

在 `App.tsx` 中按需导入替换，例如：

```tsx
import LoadableAsyncCount from './loadable-demos/01-basic/LoadableAsyncCount';
import RefreshableCount from './loadable-demos/02-refreshable/RefreshableCount';
import TodoListDemo from './loadable-demos/03-storage-family/TodoListDemo';
```

将 `<AsyncCount />` 或其他占位组件替换成对应示例，就能与主应用共存，实现“按文件夹分阶段学习”的节奏：完成一个阶段后再切换到下一个文件夹，逐步掌握 jotai 的常用能力。
