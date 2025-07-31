import propTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { IndicatorWrapper } from './style';

const Indicator = memo((props) => {
  const { currentIndex } = props;

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  return (
    <IndicatorWrapper>
      <div className='indicator'>
        {props.children}
      </div>
    </IndicatorWrapper>
  );
});
Indicator.propTypes = {
  currentIndex: propTypes.number.isRequired,
};

export default Indicator;
