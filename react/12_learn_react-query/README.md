<div align="center">

# 🚀 React Query (TanStack Query) 学习指南

<p>
  <img src="https://img.shields.io/badge/React-19.2.0-61dafb?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TanStack_Query-5.90.8-ff4154?logo=react-query" alt="TanStack Query">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7.2-646cff?logo=vite" alt="Vite">
</p>

一套完整的 React Query 实战教程，通过 4 个由浅入深的 Demo，快速掌握现代化的数据获取与状态管理方案。

</div>

---

## 📖 目录

- [为什么选择 React Query](#-为什么选择-react-query)
- [快速开始](#-快速开始)
- [核心概念](#-核心概念)
- [API 参数详解](#-api-参数详解)
- [实战教程](#-实战教程)
- [项目结构](#-项目结构)
- [进阶实践](#-进阶实践)
- [学习资源](#-学习资源)

---

## 💡 为什么选择 React Query

### 传统方式的痛点

```tsx
// ❌ 传统方式：样板代码多、状态管理复杂
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch('/api/users')
    .then(res => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

### React Query 的优势

```tsx
// ✅ React Query：简洁、强大、开箱即用
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});
```

### 核心价值

| 特性 | 说明 |
|------|------|
| 🎯 **自动缓存管理** | 智能缓存策略，避免重复请求，提升用户体验 |
| 🔄 **后台自动更新** | 窗口聚焦、网络重连时自动刷新数据 |
| ⚡ **乐观更新** | UI 即时响应，失败自动回滚 |
| 📊 **请求状态机** | loading、error、success 状态自动管理 |
| 🔁 **智能重试** | 请求失败自动重试，可配置重试策略 |
| ♾️ **无限滚动** | 内置分页和无限加载支持 |
| 🛠️ **强大的 DevTools** | 可视化调试工具，查看缓存、请求状态 |

---

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173)，左下角会出现 **React Query Devtools** 图标。

### 其他命令

```bash
pnpm build    # 生产构建（包含 TypeScript 类型检查）
pnpm preview  # 预览构建产物
pnpm lint     # 代码检查
```

---

## 🧩 核心概念

### 架构概览

```
┌─────────────────────────────────────┐
│      QueryClientProvider            │  提供全局 Query 上下文
│  ┌───────────────────────────────┐  │
│  │       QueryClient             │  │  管理所有查询缓存
│  │  ┌─────────────────────────┐  │  │
│  │  │  Query Cache            │  │  │  存储查询数据
│  │  │  - ['users']            │  │  │
│  │  │  - ['posts', userId]    │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
          ↓           ↓
    useQuery    useMutation
```

### API 速查表

| API | 用途 | 示例代码 |
|-----|------|----------|
| **QueryClient** | 全局查询管理器 | [main.tsx](src/main.tsx) |
| **QueryClientProvider** | React Context 提供者 | [main.tsx](src/main.tsx) |
| **useQuery** | 获取数据（GET） | [UsersList.tsx](src/features/basic/UsersList.tsx) |
| **useMutation** | 修改数据（POST/PUT/DELETE） | [TodoPlayground.tsx](src/features/mutations/TodoPlayground.tsx) |
| **useInfiniteQuery** | 无限滚动/分页 | [InfinitePhotos.tsx](src/features/infinite/InfinitePhotos.tsx) |
| **ReactQueryDevtools** | 开发者调试工具 | [App.tsx](src/App.tsx) |

### 学习路径

```
1️⃣ QueryClient 全局配置
    ↓
2️⃣ useQuery 基础用法
    ↓
3️⃣ 依赖查询 & 缓存策略
    ↓
4️⃣ useMutation & 乐观更新
    ↓
5️⃣ useInfiniteQuery 无限滚动
```

---

## 📘 API 参数详解

本项目中用到的所有 React Query API 参数详细说明。

### useQuery 参数

#### 配置选项（传入 useQuery）

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| **queryKey** | `unknown[]` | 查询的唯一标识符，用于缓存管理。支持数组形式，可包含依赖变量 | `['users']` 或 `['posts', userId]` |
| **queryFn** | `() => Promise<TData>` | 返回 Promise 的查询函数，用于获取数据 | `() => fetchUsers()` |
| **staleTime** | `number \| Infinity` | 数据"新鲜"的时间（毫秒）。在此期间不会重新请求 | `60_000`（60秒）、`Infinity`（永不过期） |
| **enabled** | `boolean` | 是否自动执行查询。为 `false` 时需手动触发 | `!!userId`（有userId时才查询） |
| **placeholderData** | `TData \| (prev) => TData` | 在真实数据返回前显示的占位数据 | `keepPreviousData`（保持上次数据） |
| **refetchOnWindowFocus** | `boolean` | 窗口重新聚焦时是否自动刷新（默认 `true`） | `false`（禁用自动刷新） |
| **retry** | `boolean \| number` | 失败后重试次数（默认 3 次） | `false`（不重试）、`5`（重试5次） |
| **gcTime** | `number` | 缓存垃圾回收时间（v5改名，原 `cacheTime`） | `300_000`（5分钟） |

#### 返回值（从 useQuery 返回）

| 属性 | 类型 | 说明 | 使用场景 |
|------|------|------|----------|
| **data** | `TData \| undefined` | 查询成功后的数据 | 渲染列表、展示内容 |
| **isPending** | `boolean` | 首次加载中，且没有缓存数据 | 显示骨架屏 |
| **isLoading** | `boolean` | 加载中（包括重新请求） | 通用 loading 状态 |
| **isFetching** | `boolean` | 后台正在请求（可能有缓存数据） | 显示刷新指示器 |
| **isError** | `boolean` | 查询是否失败 | 显示错误提示 |
| **error** | `Error \| null` | 错误对象 | 显示错误信息 |
| **refetch** | `() => Promise` | 手动触发重新查询 | 点击"刷新"按钮 |
| **dataUpdatedAt** | `number` | 数据最后更新的时间戳（毫秒） | 显示"最后更新时间" |

---

### useMutation 参数

#### 配置选项（传入 useMutation）

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| **mutationFn** | `(variables) => Promise` | 执行变更操作的函数 | `(title) => createTodo(title)` |
| **onMutate** | `async (variables) => context` | 变更**执行前**调用，用于乐观更新。返回值会传给 `onError` | 取消查询、保存旧数据、立即更新UI |
| **onSuccess** | `(data, variables, context) => void` | 变更**成功后**调用 | 显示成功提示、跳转页面 |
| **onError** | `(error, variables, context) => void` | 变更**失败后**调用，通常用于回滚 | 恢复 `onMutate` 中保存的旧数据 |
| **onSettled** | `(data, error, variables, context) => void` | 无论成功失败都会调用 | 刷新查询缓存 |

#### 返回值（从 useMutation 返回）

| 属性 | 类型 | 说明 | 使用场景 |
|------|------|------|----------|
| **mutate** | `(variables) => void` | 触发变更（无需等待完成） | 按钮点击、表单提交 |
| **mutateAsync** | `(variables) => Promise` | 触发变更并返回 Promise | 需要等待结果的场景 |
| **isPending** | `boolean` | 变更是否正在执行 | 禁用按钮、显示 loading |
| **isSuccess** | `boolean` | 变更是否成功 | 显示成功提示 |
| **isError** | `boolean` | 变更是否失败 | 显示错误提示 |
| **error** | `Error \| null` | 错误对象 | 显示错误信息 |
| **data** | `TData \| undefined` | 变更成功返回的数据 | 获取服务器返回的ID等 |
| **reset** | `() => void` | 重置 mutation 状态 | 关闭错误提示 |

---

### useInfiniteQuery 参数

#### 配置选项（传入 useInfiniteQuery）

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| **queryKey** | `unknown[]` | 查询的唯一标识符 | `['photos']` |
| **queryFn** | `({ pageParam }) => Promise` | 查询函数，接收 `pageParam` 参数 | `({ pageParam }) => fetchPhotos(pageParam)` |
| **initialPageParam** | `TPageParam` | 首页的页码参数（v5 新增必填） | `1` 或 `{ page: 1, limit: 10 }` |
| **getNextPageParam** | `(lastPage, allPages) => TPageParam \| undefined` | 根据最后一页数据计算下一页参数。返回 `undefined` 表示没有下一页 | `(last, all) => last.length === 9 ? all.length + 1 : undefined` |
| **getPreviousPageParam** | `(firstPage, allPages) => TPageParam \| undefined` | 计算上一页参数（用于双向滚动） | `(first, all) => all.length > 1 ? all.length - 1 : undefined` |

#### 返回值（从 useInfiniteQuery 返回）

| 属性 | 类型 | 说明 | 使用场景 |
|------|------|------|----------|
| **data** | `{ pages: TData[], pageParams: TPageParam[] }` | 所有页面的数据数组 | `data.pages.flat()` 展开所有数据 |
| **fetchNextPage** | `() => Promise` | 加载下一页 | 点击"加载更多"按钮 |
| **fetchPreviousPage** | `() => Promise` | 加载上一页 | 下拉刷新 |
| **hasNextPage** | `boolean` | 是否有下一页（根据 `getNextPageParam` 判断） | 禁用"加载更多"按钮 |
| **hasPreviousPage** | `boolean` | 是否有上一页 | 隐藏上拉刷新 |
| **isFetchingNextPage** | `boolean` | 是否正在加载下一页 | 显示底部 loading |
| **isFetchingPreviousPage** | `boolean` | 是否正在加载上一页 | 显示顶部 loading |

---

### QueryClient 方法

这些方法通过 `useQueryClient()` 获取 QueryClient 实例后调用：

| 方法 | 参数 | 说明 | 使用场景 |
|------|------|------|----------|
| **invalidateQueries** | `{ queryKey }` | 标记查询为过期，触发重新请求 | mutation 成功后刷新列表 |
| **cancelQueries** | `{ queryKey }` | 取消进行中的查询请求 | 乐观更新前取消旧请求 |
| **getQueryData** | `queryKey` | 获取缓存中的查询数据 | 读取旧数据用于回滚 |
| **setQueryData** | `queryKey, updater` | 手动更新缓存数据 | 乐观更新UI |
| **removeQueries** | `{ queryKey }` | 删除查询缓存 | 用户登出时清理数据 |
| **resetQueries** | `{ queryKey }` | 重置查询状态 | 恢复到初始状态 |
| **prefetchQuery** | `{ queryKey, queryFn }` | 预加载数据到缓存 | 鼠标悬停时预加载详情 |

---

### 常用辅助函数

| 函数 | 说明 | 示例 |
|------|------|------|
| **keepPreviousData** | 保持上一次的数据，避免切换时 UI 闪烁 | `placeholderData: keepPreviousData` |

---

### 实战示例对照表

| Demo | 使用的参数 | 文件位置 |
|------|-----------|----------|
| **基础查询** | `queryKey`, `queryFn`, `staleTime`, `refetch`, `isFetching`, `dataUpdatedAt` | [UsersList.tsx](src/features/basic/UsersList.tsx) |
| **依赖查询** | `enabled`, `placeholderData: keepPreviousData` | [UserPosts.tsx](src/features/dependent/UserPosts.tsx) |
| **乐观更新** | `mutationFn`, `onMutate`, `onError`, `onSettled`, `cancelQueries`, `getQueryData`, `setQueryData`, `invalidateQueries` | [TodoPlayground.tsx](src/features/mutations/TodoPlayground.tsx) |
| **无限滚动** | `queryFn: ({ pageParam })`, `initialPageParam`, `getNextPageParam`, `fetchNextPage`, `hasNextPage`, `isFetchingNextPage`, `data.pages` | [InfinitePhotos.tsx](src/features/infinite/InfinitePhotos.tsx) |

---

## 🎓 实战教程

### Demo 1: 基础查询 - UsersList

**📁 文件**: [src/features/basic/UsersList.tsx](src/features/basic/UsersList.tsx)

**🎯 学习目标**

- 掌握 `useQuery` 核心参数
- 理解 `staleTime` 缓存策略
- 使用 `refetch` 手动刷新
- 查看 `isFetching` 和 `dataUpdatedAt` 状态

**💻 体验步骤**

1. 点击 **"手动刷新"** 按钮，观察顶部的 "最后更新时间"
2. 在 60 秒内再次点击，数据直接从缓存返回（注意 `isFetching` 状态）
3. 打开 DevTools，查看 `['users']` 查询的缓存状态

**🔑 关键代码**

```tsx
const { data, isLoading, isFetching, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 60000  // 60秒内使用缓存
});
```

---

### Demo 2: 依赖查询 - UserPosts

**📁 文件**: [src/features/dependent/UserPosts.tsx](src/features/dependent/UserPosts.tsx)

**🎯 学习目标**

- 使用 `enabled` 控制查询执行时机
- 理解 `placeholderData` 避免 UI 闪烁
- 掌握多个 Query 的依赖关系

**💻 体验步骤**

1. 页面加载后，自动获取用户列表并展示第一个用户的文章
2. 在下拉框切换用户，观察文章列表的更新
3. 在 DevTools 中查看 `['posts', userId]` 的缓存变化

**🔑 关键代码**

```tsx
// 第一个查询：获取用户列表
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});

// 第二个查询：依赖于选中的用户
const { data: posts } = useQuery({
  queryKey: ['posts', selectedUserId],
  queryFn: () => fetchPostsByUser(selectedUserId),
  enabled: !!selectedUserId,  // 只有选中用户时才执行
  placeholderData: keepPreviousData  // 保持上一次数据避免闪烁
});
```

---

### Demo 3: 数据变更 - TodoPlayground

**📁 文件**: [src/features/mutations/TodoPlayground.tsx](src/features/mutations/TodoPlayground.tsx)

**🎯 学习目标**

- 掌握 `useMutation` 执行写操作
- 实现乐观更新（Optimistic Updates）
- 处理失败回滚和错误状态
- 使用 `invalidateQueries` 刷新缓存

**💻 体验步骤**

1. 输入待办事项并提交，观察 **立即显示**（乐观更新）
2. 多试几次触发 20% 失败概率，观察错误提示和 **自动回滚**
3. 勾选完成状态，体验状态切换的乐观更新

**🔑 关键代码**

```tsx
const addTodoMutation = useMutation({
  mutationFn: createTodo,
  onMutate: async (newTodo) => {
    // 1. 取消进行中的查询
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    // 2. 保存当前数据（用于回滚）
    const previousTodos = queryClient.getQueryData(['todos']);

    // 3. 乐观更新：立即显示新数据
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);

    return { previousTodos };  // 返回上下文用于回滚
  },
  onError: (err, newTodo, context) => {
    // 4. 失败时回滚
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  onSettled: () => {
    // 5. 无论成功失败，重新获取最新数据
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});
```

**📦 Mock API**: [src/mocks/todosApi.ts](src/mocks/todosApi.ts) (模拟 20% 失败率 + 1s 延迟)

---

### Demo 4: 无限滚动 - InfinitePhotos

**📁 文件**: [src/features/infinite/InfinitePhotos.tsx](src/features/infinite/InfinitePhotos.tsx)

**🎯 学习目标**

- 使用 `useInfiniteQuery` 实现分页加载
- 理解 `getNextPageParam` 计算下一页参数
- 掌握 `fetchNextPage` 和 `hasNextPage`

**💻 体验步骤**

1. 点击 **"加载下一页"** 按钮，每次加载 9 张照片
2. 在 DevTools 中查看 `['photos']` 下的 `pages` 数组增长
3. 加载到最后一页时，按钮变为禁用状态

**🔑 关键代码**

```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteQuery({
  queryKey: ['photos'],
  queryFn: ({ pageParam = 1 }) => fetchPhotos(pageParam),
  getNextPageParam: (lastPage, allPages) => {
    // 判断是否还有下一页
    return lastPage.length === PAGE_SIZE
      ? allPages.length + 1
      : undefined;
  },
  initialPageParam: 1
});

// 数据结构：{ pages: [[...9条], [...9条]], pageParams: [1, 2] }
```

---

## 📂 项目结构

```
src/
├── main.tsx                    # 应用入口，配置 QueryClient
├── App.tsx                     # 根组件，集成 DevTools
├── api/
│   └── jsonPlaceholder.ts      # JSONPlaceholder API 封装
├── mocks/
│   └── todosApi.ts             # 模拟 Todo API（含失败率）
└── features/
    ├── basic/
    │   └── UsersList.tsx       # Demo 1: 基础查询
    ├── dependent/
    │   └── UserPosts.tsx       # Demo 2: 依赖查询
    ├── mutations/
    │   └── TodoPlayground.tsx  # Demo 3: 乐观更新
    └── infinite/
        └── InfinitePhotos.tsx  # Demo 4: 无限滚动
```

---

## 🔥 进阶实践

完成以上 4 个 Demo 后，尝试以下挑战：

### 1. 配置优化

- 修改 `refetchOnWindowFocus` 为 `true`，体验自动刷新
- 调整 `staleTime` 和 `cacheTime`，观察缓存行为
- 配置全局 `retry` 策略和重试延迟

### 2. 功能扩展

- [ ] 为 TodoPlayground 添加 **编辑 Todo 标题** 功能
- [ ] 实现 **批量删除** Todo 的乐观更新
- [ ] 为 InfinitePhotos 添加 **上拉加载更多** 功能
- [ ] 实现 **搜索用户** 功能（结合 `enabled` 和防抖）

### 3. 真实接口

- 替换 JSONPlaceholder 为你的后端 API
- 集成认证 Token 到请求头
- 处理 API 错误和网络异常

### 4. 性能优化

- 使用 `select` 选项只订阅需要的数据
- 实现 **预加载**（Prefetching）和 **并行查询**
- 分析 DevTools 中的查询性能

---

## 📚 学习资源

### 官方文档

- [TanStack Query 官方文档](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Query v5 迁移指南](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5)

### 推荐阅读

- [React Query 设计哲学](https://tkdodo.eu/blog/practical-react-query)
- [乐观更新最佳实践](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [缓存策略详解](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

### 相关项目

- [11_learn_jotai](../11_learn_jotai) - 原子化状态管理方案

---

<div align="center">

**🎉 祝学习愉快！遇到问题欢迎提 Issue**

Made with ❤️ for React developers

</div>
