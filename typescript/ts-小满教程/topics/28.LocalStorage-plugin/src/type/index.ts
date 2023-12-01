// expire过期时间key permanent永久保存key
import { StorageType } from '../enum';
export type Key = string;
export type Expire = StorageType.permanent | number; // 过期时间
export interface Result<T> {
  message: string;
  value: T | null;
}
export interface Data<T> {
  value: T;
  [StorageType.expire]: Expire;
}

export interface IStorage {
  get: <T>(key: Key) => Result<T>;
  set: <T>(key: Key, value: T, expire: Expire) => void;
  remove: (key: Key) => void;
  clear: () => void;
}
