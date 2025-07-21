import React, { memo } from "react";
import { HeaderCenterWrapper } from "./style";
import Icon from "@/icons/Icon";

const HeaderCenter = memo(() => {
  return (
    <HeaderCenterWrapper>
      <div className="search-bar">
        <input type="text" placeholder="搜索房源" />
        <span className="icon">
          <Icon name="search" size={16} color="#fff" />
        </span>
      </div>
    </HeaderCenterWrapper>
  );
});

export default HeaderCenter;
