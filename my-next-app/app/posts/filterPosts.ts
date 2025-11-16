// app/posts/filterPosts.ts
import type { Post } from './data';

export function filterPostsByQuery(allPosts: Post[], query: string): Post[] {
  const trimmed = query.trim();

  if (!trimmed) {
    return allPosts;
  }

  const lower = trimmed.toLowerCase();

  return allPosts.filter((post) =>
    post.title.toLowerCase().includes(lower),
  );
}