import { getComments } from './actions';
import CommentForm from './CommentForm';
import DeleteButton from './DeleteButton';

export default async function ServerActionsDemo() {
  // Server Component 直接调函数拿数据，不需要 fetch
  const comments = await getComments();

  return (
    <div style={{ padding: 32, maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
        4-2 Server Actions
      </h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>添加评论</h2>
        <CommentForm />
      </section>

      <section>
        <h2 style={{ marginBottom: 12 }}>
          评论列表（共 {comments.length} 条）
        </h2>
        {comments.length === 0 ? (
          <p style={{ color: '#999' }}>暂无评论</p>
        ) : (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {comments.map((comment) => (
              <li
                key={comment.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  background: '#f5f5f5',
                  borderRadius: 4,
                }}
              >
                <span>{comment.text}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#999' }}>
                    {new Date(comment.createdAt).toLocaleTimeString('zh-CN')}
                  </span>
                  <DeleteButton id={comment.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
