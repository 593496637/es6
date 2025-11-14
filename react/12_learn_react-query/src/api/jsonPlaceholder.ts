const BASE_URL = 'https://jsonplaceholder.typicode.com';

const simulateLatency = (min = 280, max = 640) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min));

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`请求失败：${response.status}`);
  }
  const data = (await response.json()) as T;
  await simulateLatency();
  return data;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const fetchUsers = () => fetchJson<User[]>('/users');

export const fetchPostsByUser = (userId: number) => fetchJson<Post[]>(`/users/${userId}/posts`);

export const fetchPhotoPage = (page = 1, limit = 8) =>
  fetchJson<Photo[]>(`/photos?_page=${page}&_limit=${limit}`);
