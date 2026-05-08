// src/app/playground/1-1-layout/page.tsx
export default function LayoutIntroPage() {
    return (
      <div>
        <h1>1-1 项目结构与 Layout</h1>
  
        <h2>目录 = 路由</h2>
        <table>
          <thead>
            <tr><th>文件路径</th><th>对应 URL</th></tr>
          </thead>
          <tbody>
            <tr><td>app/page.tsx</td><td>/</td></tr>
            <tr><td>app/playground/page.tsx</td><td>/playground</td></tr>
            <tr><td>app/playground/1-1-layout/page.tsx</td><td>/playground/1-1-layout</td></tr>
          </tbody>
        </table>
  
        <h2>约定文件</h2>
        <table>
          <thead>
            <tr><th>文件名</th><th>作用</th></tr>
          </thead>
          <tbody>
            <tr><td>page.tsx</td><td>页面内容，URL 可访问</td></tr>
            <tr><td>layout.tsx</td><td>布局包裹，切换页面不重新渲染</td></tr>
            <tr><td>loading.tsx</td><td>加载态</td></tr>
            <tr><td>error.tsx</td><td>错误边界</td></tr>
            <tr><td>not-found.tsx</td><td>404</td></tr>
            <tr><td>route.ts</td><td>API 接口</td></tr>
          </tbody>
        </table>
      </div>
    )
  }