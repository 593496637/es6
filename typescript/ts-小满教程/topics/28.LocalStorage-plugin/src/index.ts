import { IStorage, Key, Expire, Data, Result } from './type';
import { StorageType } from './enum';

export class Storage implements IStorage {
  get<T>(key: Key): Result<T> {
    const value = localStorage.getItem(key);
    if (value) {
      const data: Data<T> = JSON.parse(value);
      const { value: dataValue, [StorageType.expire]: expire } = data;
      const now = new Date().getTime();
      if (expire === StorageType.permanent || expire > now) {
        return {
          message: '成功',
          value: dataValue,
        };
      } else {
        this.remove(key);
        return {
          message: `您的${key}已过期`,
          value: null,
        };
      }
    } else {
      return {
        message: '您的key不存在',
        value: null,
      };
    }
  }
  set<T>(key: Key, value: T, expire: Expire = StorageType.permanent): void {
    const data = {
      value,
      [StorageType.expire]: expire,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }
  remove(key: Key): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
