// src/app/playground/1-2-nested-layout/page.tsx
export default function NestedLayoutPage() {
  return (
    <div>
      <h1>1-2 嵌套 Layout</h1>
      <p>这个页面同时被三层 layout 包裹：</p>
      <ol>
        <li>RootLayout（app/layout.tsx）— HTML 骨架</li>
        <li>PlaygroundLayout（playground/layout.tsx）— 顶部导航</li>
        <li>NestedLayout（1-2-nested-layout/layout.tsx）— 侧边栏</li>
      </ol>
    </div>
  );
}
