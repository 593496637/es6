import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { SectionFooterWrapper } from './style';
import Icon from '@/icons/Icon';
import { useNavigate } from 'react-router';

const SectionFooter = memo((props) => {
  const { onMoreClick } = props;
  const title = props.title ? `显示更多${props.title}房源 ` : '显示全部';

  const navigate = useNavigate();
  const onMoreClickHandle = () => {
    if (onMoreClick) {
      onMoreClick();
    } else {
      console.log('onMoreClickHandle');
      navigate('/entire');
    }
  };

  return (
    <SectionFooterWrapper color={props.title ? '#ff385c' : '#000'}>
      <div className='info' onClick={onMoreClickHandle}>
        {title}
        <Icon name='arrow-right' className='arrow' />
      </div>
    </SectionFooterWrapper>
  );
});

SectionFooter.propTypes = {
  title: PropTypes.string,
};

export default SectionFooter;
