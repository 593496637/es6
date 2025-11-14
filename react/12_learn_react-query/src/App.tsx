import UsersList from './features/basic/UsersList';
import UserPosts from './features/dependent/UserPosts';
import TodoPlayground from './features/mutations/TodoPlayground';
import InfinitePhotos from './features/infinite/InfinitePhotos';
import './App.css';

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">12_learn_react-query</p>
        <h1>TanStack Query 练习场</h1>
        <p>
          参照 jotai demo 的结构，把 React Query 的核心能力拆成 4 个板块，方便逐个体验：查询缓存、依赖查询、
          mutation 乐观更新，以及 useInfiniteQuery。
        </p>
        <ul className="hero-list">
          <li>Query 缓存 + 手动刷新</li>
          <li>enabled + placeholderData 依赖查询</li>
          <li>Mutation 乐观更新 + invalidateQueries</li>
          <li>分页 / infinite query</li>
        </ul>
      </header>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Demo 01</p>
            <h2>基础 Query · 手动刷新</h2>
            <p className="muted">staleTime 60s + dataUpdatedAt，演示缓存 + refetch。</p>
          </div>
        </div>
        <UsersList />
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Demo 02</p>
            <h2>依赖 Query</h2>
            <p className="muted">选择用户后再拉取文章，启用 placeholderData 保留上一份内容。</p>
          </div>
        </div>
        <UserPosts />
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Demo 03</p>
            <h2>Mutation 乐观更新</h2>
            <p className="muted">onMutate + onError 回滚，结合 invalidateQueries 保证最终一致。</p>
          </div>
        </div>
        <TodoPlayground />
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Demo 04</p>
            <h2>useInfiniteQuery</h2>
            <p className="muted">逐页加载 JSONPlaceholder photos。</p>
          </div>
        </div>
        <InfinitePhotos />
      </section>
    </div>
  );
}
