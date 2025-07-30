import request from '../request';

// 高性价比房源
export function getGoodPriceInfoData() {
  return request.get({
    url: '/home/goodprice',
  });
}

// 高分房源
export function getHighScoreInfoData() {
  return request.get({
    url: '/home/highscore',
  });
}

// 获取折扣房源
export function getDiscountInfoData() {
  return request.get({
    url: '/home/discount',
  });
}

// 获取热门推荐房源
export function getHotRecommendInfoData() {
  return request.get({
    url: '/home/hotRecommenddest',
  });
}

// 获取海外房源
export function getLongforInfoData() {
  return request.get({
    url: '/home/longfor',
  });
}


// 获取plus数据
export function getPlusInfoData() {
  return request.get({
    url: '/home/plus',
  });
}