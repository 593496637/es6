// components/CommentsBox.test.tsx

import { render, screen } from '@testing-library/react';
import CommentsBox from './CommentsBox';

describe('CommentsBox 组件', () => {
  it('渲染时显示初始提示文案和提交按钮', () => {
    render(<CommentsBox />);

    // 1. 没有评论时的提示
    expect(screen.getByText(/还没有评论/)).toBeInTheDocument();

    // 2. 输入框的 placeholder
    expect(screen.getByPlaceholderText('写点什么吧…')).toBeInTheDocument();

    // 3. 提交按钮
    expect(
      screen.getByRole('button', { name: '提交评论' })
    ).toBeInTheDocument();
  });
});
