import { useQuery } from '@tanstack/react-query';
import { fetchUsers, type User } from '../../api/jsonPlaceholder';

export default function UsersList() {
  const {
    data: users,
    isPending,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 60_000,
  });

  const errorMessage = error instanceof Error ? error.message : '未知错误';
  const lastUpdated =
    dataUpdatedAt === 0 ? '尚未拉取' : new Intl.DateTimeFormat('zh-CN', { timeStyle: 'medium' }).format(dataUpdatedAt);

  return (
    <div className="panel">
      <div className="panel-toolbar">
        <div>
          <p className="eyebrow">queryKey: ['users']</p>
          <p className="muted">staleTime 60s · refetchOnWindowFocus 禁用</p>
        </div>
        <button className="ghost-button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? '刷新中...' : '手动刷新'}
        </button>
      </div>

      {isPending && <p className="muted">正在获取用户数据...</p>}
      {error && <p className="error-text">请求失败：{errorMessage}</p>}

      {users && (
        <>
          <p className="muted">最后一次更新：{lastUpdated}</p>
          <ul className="list">
            {users.slice(0, 6).map((user: User) => (
              <li key={user.id}>
                <div className="title-row">
                  <span className="title">{user.name}</span>
                  <span className="tag">{user.company.name}</span>
                </div>
                <p className="muted">@{user.username} · {user.phone}</p>
                <p className="muted">{user.company.catchPhrase}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
