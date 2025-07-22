import React, { memo, useEffect } from "react";
import Banner from "./components/home-banner";
import { HomeWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoodPriceInfoData } from "@/store/modules/home";
import SectionHeader from "@/components/section-header";

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
        <ul>
          {goodPriceInfo?.list?.map((item) => {
            return (
              <li key={item.id}>
                <img src={item.picture_url} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    </HomeWrapper>
  );
});

export default Home;
