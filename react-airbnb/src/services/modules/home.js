import request from "../request";

export function getGoodPriceInfoData() {
  return request.get({
    url: '/home/goodprice',
  })
}