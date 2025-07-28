import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { SectionTabsWrapper } from './style';
import classNames from 'classnames';
import ScrollView from '@/base-ui/scroll-view';

const SectionTabs = memo((props) => {
  const { tabItems = [], tabClick } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const itemClickHandle = (index, name) => {
    setCurrentTab(index);

    // 派发事件
    tabClick(index, name);
  };
  return (
    <SectionTabsWrapper>
      <ScrollView>
        {tabItems.map((name, index) => {
          return (
            <div
              className={classNames('tab-item', {
                active: currentTab === index,
              })}
              key={index}
              onClick={() => itemClickHandle(index, name)}
            >
              {name}
            </div>
          );
        })}
      </ScrollView>
    </SectionTabsWrapper>
  );
});

SectionTabs.propTypes = {
  tabItems: PropTypes.array,
};

export default SectionTabs;
