// loadMap.js
/**
 * @description 加载百度地图相关资源js
 */
export default function loadBMap() {
  return new Promise((resolve, reject) => {
    //聚合API依赖基础库,因此先加载基础库再加载聚合API
    ///MarkerClusterer_min.js依赖TextIconOverlay.js。因此先加载TextIconOverlay.js
    const textIconOverlayUrl = 'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay.js'
    const markerClusterer_min = 'https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js'
    try {
      resolve(
        loadBaiduMapJs().then(() => {
          resolve(
            loadJs(textIconOverlayUrl).then(() => {
              resolve(loadJs(markerClusterer_min))
            })
          )
        })
      )
    } catch (err) {
      reject(err)
    }
  })
}
/**
 * @description 加载百度地图基础组件js
 */
export function loadBaiduMap() {
  const AK = '1lGcdw9kY7qkQchAtYeCEKARKmyzSCez'
  const BMap_URL = 'https://api.map.baidu.com/api?v=3.0&ak=' + AK + '&callback=initBMap'
  return new Promise((resolve, reject) => {
    try {
      // 如果已加载直接返回
      const BMap = window.BMap
      if (typeof BMap !== 'undefined') {
        resolve(BMap)
        return true
      }
      window.initBMap = function () {
        resolve(BMap)
      }
      const scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.setAttribute('src', BMap_URL)
      document.head.appendChild(scriptNode)
    } catch (err) {
      const scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.onerror = reject
    }
  })
}
/**
 * @description 加载第三方组件js公共方法
 * @param {string} url
 */
export function loadJs(url) {
  return new Promise((resolve, reject) => {
    try {
      const scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.setAttribute('src', url)
      document.head.appendChild(scriptNode)
      scriptNode.onload = () => {
        resolve()
      }
    } catch (err) {
      const scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.onerror = reject
    }
  })
}