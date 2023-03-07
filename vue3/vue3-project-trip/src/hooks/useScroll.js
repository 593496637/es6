import { ref, onActivated, onDeactivated } from 'vue';

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
export default function useScroll() {
  const isArrivedBottom = ref(false)
  const scrollListenerHandler = () => {
    //获取滚动条滚动的距离
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    //判断是否到达底部
    if (scrollTop + clientHeight >= scrollHeight) {
      //到达底部
      isArrivedBottom.value = true
    }
  }
  onActivated(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })

  onDeactivated(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isArrivedBottom }
}
