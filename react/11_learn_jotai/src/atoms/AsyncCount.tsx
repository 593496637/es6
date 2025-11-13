import { useAtomValue } from 'jotai';
import { asyncCountAtom } from './counter';

export default function AsyncCount() {
  const value = useAtomValue(asyncCountAtom);
  return (
    <div>
      <h3>🕓 异步加载的数字：{value}</h3>
    </div>
  );
}
