import request from "../request";

// 高性价比房源
export function getGoodPriceInfoData() {
  return request.get({
    url: '/home/goodprice',
  })
}

// 高分房源
export function getHighScoreInfoData() {
  return request.get({
    url: '/home/highscore',
  })
}

