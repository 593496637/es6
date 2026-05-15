'use client';

import { deleteComment } from './actions';

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button
      onClick={() => deleteComment(id)}
      style={{
        marginLeft: 8,
        color: 'red',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
      }}
    >
      删除
    </button>
  );
}
