import React, { memo, useState, useEffect } from "react";
import { HeaderRightWrapper } from "./style";
import Icon from "@/icons/Icon";

const HeaderRight = memo(() => {
  const [showPanel, setShowPanel] = useState(false);

  // 点击其他地方关闭面板
  useEffect(() => {
    const handleClickOther = (event) => {
      // 检查点击的目标是否在HeaderRight组件内部
      const headerRight = event.currentTarget.querySelector('.icons-right');
      if (headerRight && !headerRight.contains(event.target)) {
        
        setShowPanel(false);
      }
    };
    // 改为冒泡阶段监听，避免干扰其他组件的点击事件
    document.addEventListener("click", handleClickOther, false);
    return () => {
      document.removeEventListener("click", handleClickOther, false);
    };
  }, []);

  const handleShowPanel = () => {
    setShowPanel(!showPanel);
  };
  return (
    <HeaderRightWrapper>
      <div className="btns">
        <span className="btn">登录</span>
        <span className="btn">注册</span>
      </div>
      <div className="icons">
        <div className="icon-wrapper">
          <Icon name="global" size={16} className="icon global" />
        </div>
        <div className="icons-right" onClick={handleShowPanel}>
          <Icon name="menu" size={20} className="icon" />
          <Icon name="avatar" size={30} className="icon" />
          {showPanel && (
            <div className="panel">
              <div className="panel-top panel-item">
                <div className="item register">注册</div>
                <div className="item login">登录</div>
              </div>
              <div className="panel-bottom panel-item">
                <div className="item">出租房源</div>
                <div className="item">成为房主</div>
                <div className="item">帮助中心</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </HeaderRightWrapper>
  );
});

export default HeaderRight;
