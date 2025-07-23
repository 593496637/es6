import React, { memo, useEffect } from "react";
import Banner from "./components/home-banner";
import { HomeWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoodPriceInfoData } from "@/store/modules/home";
import SectionHeader from "@/components/section-header";
import RoomItem from "@/components/room-item";
import { Button } from "@mui/material";

const Home = memo(() => {
  const goodPriceInfo = useSelector((state) => state.home.goodPriceInfo);

  // 派发异步事件：发送网络请求
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGoodPriceInfoData());
  }, [dispatch]);
  return (
    <HomeWrapper>
      <Banner />
      <div className="content">
        <SectionHeader title={goodPriceInfo?.title} />
        <ul className="room-list">
          {goodPriceInfo?.list?.map((item) => {
            return <RoomItem key={item.id} itemData={item} />;
          })}
        </ul>

        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
    </HomeWrapper>
  );
});

export default Home;
