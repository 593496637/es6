import { Suspense } from "react";
import { useAtom } from "jotai";
import { countAtom, doubleCountAtom } from "./atoms/counter";
import CounterDisplay from "./CounterDisplay";
import AsyncCount from "./atoms/AsyncCount";
import LoadableAsyncCount from "./loadable-demos/01-basic/LoadableAsyncCount";
import RefreshableCount from "./loadable-demos/02-refreshable/RefreshableCount";
import TodoListDemo from "./loadable-demos/03-storage-family/TodoListDemo";

export default function App() {
  const [count, setCount] = useAtom(countAtom);
  const [doubleCount] = useAtom(doubleCountAtom);

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h2>基础计数器示例</h2>
        <h3>当前计数：{count}</h3>
        <h3>双倍计数：{doubleCount}</h3>
        <CounterDisplay />
        <Suspense fallback={<p>正在加载异步数据...</p>}>
          <AsyncCount />
        </Suspense>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button onClick={() => setCount((c) => c + 1)}>Increment</button>
          <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      </section>

      <section>
        <h2>Loadable 学习 · 步骤一</h2>
        <p>使用 loadableRandomAtom 展示 loading / error / data 三种状态。</p>
        <LoadableAsyncCount />
      </section>

      <section>
        <h2>Loadable 学习 · 步骤二</h2>
        <p>加入刷新按钮和 20% 的失败概率，练习手动触发请求。</p>
        <RefreshableCount />
      </section>

      <section>
        <h2>Loadable 学习 · 步骤三</h2>
        <p>在此基础上体验 atomWithStorage + atomFamily，感受持久化与多实例管理。</p>
        <TodoListDemo />
      </section>
    </div>
  );
}
