'use client';

import { useState, FormEvent } from 'react';

type Comment = {
  id: number;
  content: string;
};

type CommentsBoxProps = {
  initialComments?: Comment[];
};

export default function CommentsBox({
  initialComments = [],
}: CommentsBoxProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [input, setInput] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    setComments((prev) => [...prev, { id: Date.now(), content: trimmed }]);

    setInput('');
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>评论</h2>

      {comments.length === 0 ? (
        <p style={{ color: '#666', fontSize: 14 }}>还没有评论，快来抢沙发～</p>
      ) : (
        <ul style={{ marginTop: 12, marginBottom: 16, paddingLeft: 18 }}>
          {comments.map((c) => (
            <li key={c.id} style={{ marginBottom: 8 }}>
              {c.content}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='写点什么吧…'
          rows={3}
          style={{ width: '100%', padding: 8, fontSize: 14 }}
        />
        <button
          type='submit'
          style={{ marginTop: 8, padding: '6px 12px', fontSize: 14 }}
        >
          提交评论
        </button>
      </form>
    </div>
  );
}
