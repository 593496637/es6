import React, { memo } from 'react';
import { HeaderLeftWrapper } from './style';
import Icon from '@/icons/Icon';
import { useNavigate } from 'react-router';

const HeaderLeft = memo(() => {
  // 回到首页
  const navigate = useNavigate();
  const goHomeHandle = () => {
    navigate('/home');
  };

  return (
    <HeaderLeftWrapper>
      <Icon
        name='logo'
        width={102}
        height={32}
        className='logo'
        onClick={goHomeHandle}
      />
    </HeaderLeftWrapper>
  );
});

export default HeaderLeft;
