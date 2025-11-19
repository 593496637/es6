# 03-storage-family 教程

> 目标：通过一个小型代办示例，同时练习 `atomWithStorage`（持久化）和 `atomFamily`（多实例 atom）。

## 文件结构

- `atoms.ts`
  - `todosStorageAtom`：`atomWithStorage` 创建的持久化列表，默认存放两条代办，键名为 `loadable-demo-todos`。
  - `todosAtom`：读写 `todosStorageAtom` 的中间层，方便在需要时集中更新列表。
  - `todoItemFamily`：`atomFamily` 返回的工厂，传入 id 就能拿到「这一条代办」的 atom。
- `TodoListDemo.tsx`
  - `TodoListDemo` 组件先用 `useAtomValue(todosAtom)` 取得列表，再为每条记录渲染 `TodoItem`。
  - `TodoItem` 内部通过 `const todoAtom = todoItemFamily(id)` 拿到专属 atom，然后 `useAtom` 读写，勾选复选框即可更新对应数据并落盘。

## 运行逻辑

1. 首次渲染时，`atomWithStorage` 会尝试从 `localStorage` 读取 `loadable-demo-todos`，没有就用默认数组。
2. `TodoListDemo` 按列表渲染，每个 `TodoItem` 都拥有自己的 atom —— `todoItemFamily(id)` 确保读写互不干扰。
3. 勾选复选框后触发 `setTodo({ done: ... })`，内部会把这一项合并更新并写回 `todosAtom`，最终同步到 storage。
4. 刷新浏览器页签，列表勾选状态会保持，因为数据已经保存在 `localStorage` 中。

## 如何体验

在 `App.tsx` 中导入组件并渲染，比如：

```tsx
import TodoListDemo from './loadable-demos/03-storage-family/TodoListDemo';

// ...
<TodoListDemo />
```

建议把它放在步骤二后面，这样就有「异步刷新 → 持久化 + 多实例」的循序渐进路线。

## 可以尝试的拓展

1. 为列表新增“添加代办”的表单练习写入逻辑。
2. 把 `atomFamily` 换成 `selectAtom`，只读取单条代办的某些字段，体会不同 API 的适用场景。
3. 将 `atomWithStorage` 的 key 改成项目专属前缀，避免与真实项目的 localStorage 冲突。

至此，你就掌握了 Jotai 在入门阶段最常见的三大能力：基础原子、可刷新异步、以及持久化/多实例扩展。恭喜！
