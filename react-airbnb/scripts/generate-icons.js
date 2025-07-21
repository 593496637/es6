const fs = require('fs');
const path = require('path');

const iconsDir = path.resolve(__dirname, '../src/icons/svgs');
const indexPath = path.resolve(__dirname, '../src/icons/index.js');

// 1. 读取 svgs 文件夹下的所有文件名
const iconFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

// 2. 为每个图标生成懒加载导入语句
const iconExports = iconFiles.map(file => {
  const name = file.replace('.svg', '');
  // 将 'arrow-left' 转换为 'arrowLeft' 以作为合法的变量名，或直接用字符串作键
  const key = name.includes('-') ? `'${name}'` : name;
  return `  ${key}: lazy(() => import('./svgs/${file}').then(m => ({ default: m.ReactComponent }))),`;
});

// 3. 构造最终的 index.js 文件内容
const fileContent = `
import { lazy } from 'react';

const icons = {
${iconExports.join('\n')}
};

export default icons;
`;

// 4. 将内容写入到 index.js 文件
fs.writeFileSync(indexPath, fileContent.trim());

console.log('✅ Icon index generated successfully!');