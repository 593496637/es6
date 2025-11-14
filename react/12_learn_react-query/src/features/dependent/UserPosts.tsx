import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPostsByUser, fetchUsers, type Post } from '../../api/jsonPlaceholder';

export default function UserPosts() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60_000,
  });

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedUserId && usersQuery.data?.length) {
      setSelectedUserId(usersQuery.data[0].id);
    }
  }, [selectedUserId, usersQuery.data]);

  const postsQuery = useQuery({
    queryKey: ['posts', selectedUserId],
    queryFn: () => fetchPostsByUser(selectedUserId as number),
    enabled: Boolean(selectedUserId),
    placeholderData: keepPreviousData,
  });

  const options = useMemo(
    () => usersQuery.data?.map((user) => ({ label: user.name, value: user.id })) ?? [],
    [usersQuery.data],
  );

  const isLoading = usersQuery.isPending || postsQuery.isPending;

  return (
    <div className="panel">
      <div className="panel-toolbar">
        <div>
          <p className="eyebrow">依赖查询（enabled + placeholderData）</p>
          <p className="muted">选择用户后，再发起 /posts?userId=xx 请求</p>
        </div>
        <select
          className="dropdown"
          value={selectedUserId ?? ''}
          onChange={(event) => setSelectedUserId(Number(event.target.value))}
          disabled={!options.length}
        >
          <option value="" disabled>
            {usersQuery.isPending ? '加载用户中...' : '请选择用户'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <p className="muted">正在加载用户文章...</p>}
      {(usersQuery.error || postsQuery.error) && (
        <p className="error-text">
          {(usersQuery.error ?? postsQuery.error) instanceof Error
            ? (usersQuery.error ?? postsQuery.error)?.message
            : '请求失败'}
        </p>
      )}

      {postsQuery.data && (
        <ul className="list">
          {postsQuery.data.slice(0, 5).map((post: Post) => (
            <li key={post.id}>
              <div className="title-row">
                <span className="title">{post.title}</span>
              </div>
              <p className="muted">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
