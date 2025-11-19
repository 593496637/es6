import { useAtomValue } from 'jotai';
import { loadableRandomAtom } from './atoms';

export default function LoadableAsyncCount() {
  const result = useAtomValue(loadableRandomAtom);
  console.log(result);

  if (result.state === 'loading') {
    return <p>[步骤一] 正在加载随机数...</p>;
  }

  if (result.state === 'hasError') {
    return <p>[步骤一] 加载失败：{String(result.error)}</p>;
  }

  return <p>[步骤一] 最新随机数：{result.data}</p>;
}
