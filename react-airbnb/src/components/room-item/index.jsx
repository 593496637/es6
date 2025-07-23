import PropTypes from "prop-types";
import React, { memo } from "react";
import { RoomItemWrapper } from "./style";

const RoomItem = memo((props) => {
  const { itemData } = props;
  return (
    <RoomItemWrapper
      style={{ color: itemData?.verify_info?.text_color || "#39576A" }}
    >
      <div className="inner">
        <div className="cover">
          <img src={itemData.picture_url} alt="" />
        </div>
        <div className="desc">
          {itemData?.verify_info?.messages?.join("·") || "·"}
        </div>
        <div className="name">{itemData.name}</div>
        <div className="price-info">
          <span className="price-info-price">￥{itemData.price}</span>
          <span className="price-info-unit">/晚</span>
        </div>
      </div>
    </RoomItemWrapper>
  );
});

RoomItem.propTypes = {
  itemData: PropTypes.object.isRequired,
};

export default RoomItem;
