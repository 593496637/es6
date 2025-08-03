
// 创建临时测试文件来验证Redux状态变化
console.log('=== Redux Store Debug ===');
let renderCount = 0;

// 模拟Home组件的渲染行为
const mockHomeRender = () => {
  renderCount++;
  console.log('Home组件第', renderCount, '次渲染 - 时间:', new Date().toISOString());
};

// 模拟fetchGoodPriceInfoData的6个异步请求
const simulateAsyncCalls = () => {
  console.log('开始执行fetchGoodPriceInfoData...');
  
  // 6个异步请求，每个完成后都会触发dispatch
  setTimeout(() => { console.log('getGoodPriceInfoData完成'); mockHomeRender(); }, 100);
  setTimeout(() => { console.log('getHighScoreInfoData完成'); mockHomeRender(); }, 150);
  setTimeout(() => { console.log('getDiscountInfoData完成'); mockHomeRender(); }, 200);
  setTimeout(() => { console.log('getHotRecommendInfoData完成'); mockHomeRender(); }, 250);
  setTimeout(() => { console.log('getLongforInfoData完成'); mockHomeRender(); }, 300);
  setTimeout(() => { console.log('getPlusInfoData完成'); mockHomeRender(); }, 350);
};

// 模拟组件挂载流程
console.log('=== 模拟首页刷新流程 ===');
console.log('1. 路由重定向到/home');
console.log('2. 开始加载懒加载的Home组件');
console.log('3. Suspense显示Loading...');
setTimeout(() => {
  console.log('4. Home组件加载完成，开始首次渲染');
  mockHomeRender();
  console.log('5. useEffect触发，开始网络请求');
  simulateAsyncCalls();
}, 50);

