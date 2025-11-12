import { useAtom } from 'jotai';
import { countAtom } from './atoms/counter';

export default function CounterDisplay() {
  const [count] = useAtom(countAtom);

  return <h1>Count: {count}</h1>;
}
