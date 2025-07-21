import React, { memo } from "react";
import { HeaderRightWrapper } from "./style";
import Icon from "@/icons/Icon";

const HeaderRight = memo(() => {
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
        <div className="icons-right">
          <Icon name="menu" size={20} className="icon" />
          <Icon name="avatar" size={30} className="icon" />
        </div>
      </div>
    </HeaderRightWrapper>
  );
});

export default HeaderRight;
