import { ref, onMounted, onUnmounted } from 'vue';
import { throttle } from 'underscore'

// 方法一
// 用于监听滚动条是否到达底部
// export default function useScroll(bottomArrivedCallback) {
//   const scrollListenerHandler = () => {
//     //获取滚动条滚动的距离
//     const { scrollTop, clientHeight, scrollHeight } = document.documentElement
//     //判断是否到达底部
//     if (scrollTop + clientHeight >= scrollHeight) {
//       //到达底部执行回调函数
//       bottomArrivedCallback && bottomArrivedCallback()
//     }
//   }
//   onActivated(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   onDeactivated(() => {
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })
// }


// 方法二
// 用于监听滚动条是否到达底部
export default function useScroll(elRef) {
  let el = window
  const isArrivedBottom = ref(false)
  // 定义响应式数据
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)
  // 节流函数
  const scrollListenerHandler = throttle(() => {
    //获取滚动条滚动的距离
    if (el === window) {
      scrollTop.value = document.documentElement.scrollTop
      clientHeight.value = document.documentElement.clientHeight
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      scrollTop.value = el.scrollTop
      clientHeight.value = el.clientHeight
      scrollHeight.value = el.scrollHeight
    }

    //判断是否到达底部

    // 由于滚动条滚动的距离是一个浮点数，所以这里需要做一个判断,<=1的目的是为了防止滚动条滚动的距离是一个浮点数
    // 如果滚动条滚动的距离+可视区域的高度>=文档的高度，那么就说明滚动条已经到达底部了
    if (scrollHeight.value - scrollTop.value - clientHeight.value <= 1) {
      //到达底部
      isArrivedBottom.value = true
    }
  }, 100)
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener('scroll', scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })


  return { isArrivedBottom, scrollTop, clientHeight, scrollHeight }
}
