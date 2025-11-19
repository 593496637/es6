import { useAtomValue, useSetAtom } from 'jotai';
import { refreshableRandomAtom, refreshRequestAtom } from './atoms';

export default function RefreshableCount() {
  const result = useAtomValue(refreshableRandomAtom);
  const refresh = useSetAtom(refreshRequestAtom);

  let content: string;
  if (result.state === 'loading') {
    content = '加载中...';
  } else if (result.state === 'hasError') {
    content = `加载失败：${String(result.error)}`;
  } else {
    content = `当前数值：${result.data}`;
  }

  return (
    <div>
      <p>[步骤二] {content}</p>
      <button onClick={() => refresh()}>刷新随机数</button>
    </div>
  );
}
