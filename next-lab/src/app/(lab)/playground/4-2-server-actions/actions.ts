'use server';

import { revalidatePath } from 'next/cache';

// 用内存模拟数据库，刷新页面会重置
type Comment = { id: number; text: string; createdAt: string };

const comments: Comment[] = [
  { id: 1, text: '第一条评论', createdAt: new Date().toISOString() },
  { id: 2, text: '第二条评论', createdAt: new Date().toISOString() },
];
let nextId = 3;

// 读取（在 Server Component 里直接调用，不需要是 Server Action）
export async function getComments(): Promise<Comment[]> {
  return [...comments];
}

// 新增 —— 配合 useActionState 使用，签名固定：(prevState, formData)
export async function addComment(
  prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const text = formData.get('text');

  // 服务端校验
  if (typeof text !== 'string' || text.trim() === '') {
    return { error: '评论内容不能为空' };
  }
  if (text.trim().length > 100) {
    return { error: '评论不能超过 100 字' };
  }

  comments.push({
    id: nextId++,
    text: text.trim(),
    createdAt: new Date().toISOString(),
  });

  // 让 /playground/4-2-server-actions 这个页面的缓存失效，触发重新渲染
  revalidatePath('/playground/4-2-server-actions');
  return null; // null 表示无错误
}

// 删除 —— 直接传 id，不走 FormData
export async function deleteComment(id: number): Promise<void> {
  const index = comments.findIndex((c) => c.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
  }
  revalidatePath('/playground/4-2-server-actions');
}
