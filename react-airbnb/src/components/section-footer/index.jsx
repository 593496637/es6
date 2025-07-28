import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { SectionFooterWrapper } from './style';
import Icon from '@/icons/Icon';

const SectionFooter = memo((props) => {
  const title = props.title ? `显示更多${props.title}房源 ` : '显示全部';

  return (
    <SectionFooterWrapper color={props.title ? '#ff385c' : '#000'}>
      <div className='info'>
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
