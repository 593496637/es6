'use client';

import { useActionState } from 'react'; // React 19 / Next.js 15
import { useFormStatus } from 'react-dom';
import { addComment } from './actions';

// 单独抽成子组件，才能用 useFormStatus 感知父 form 的提交状态
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      style={{ marginLeft: 8, opacity: pending ? 0.5 : 1 }}
    >
      {pending ? '提交中...' : '添加评论'}
    </button>
  );
}

export default function CommentForm() {
  // useActionState 返回 [当前状态, 包装后的 action]
  // 第二个参数是初始状态
  const [state, formAction] = useActionState(addComment, null);

  return (
    <form
      action={formAction}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        maxWidth: 400,
      }}
    >
      <div style={{ display: 'flex' }}>
        <input
          name='text'
          placeholder='输入评论（最多 100 字）'
          style={{
            flex: 1,
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
        <SubmitButton />
      </div>
      {/* state 不为 null 时说明有错误 */}
      {state?.error && (
        <p style={{ color: 'red', margin: 0, fontSize: 14 }}>{state.error}</p>
      )}
    </form>
  );
}
