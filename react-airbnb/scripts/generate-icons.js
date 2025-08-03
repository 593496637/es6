const fs = require('fs');
const path = require('path');

const iconsDir = path.resolve(__dirname, '../src/icons/svgs');
const indexPath = path.resolve(__dirname, '../src/icons/index.js');

// 1. 读取 svgs 文件夹下的所有文件名
const iconFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

// 2. 为每个图标生成同步导入语句（避免懒加载触发Suspense导致双重Loading）
const iconImports = iconFiles.map(file => {
  const name = file.replace('.svg', '');
  // 生成合法的变量名：arrow-left -> ArrowLeftIcon
  const componentName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Icon';
  return `import { ReactComponent as ${componentName} } from './svgs/${file}';`;
});

const iconExports = iconFiles.map(file => {
  const name = file.replace('.svg', '');
  const componentName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Icon';
  const key = name.includes('-') ? `'${name}'` : name;
  return `  ${key}: ${componentName},`;
});

// 3. 构造最终的 index.js 文件内容
const fileContent = `
// 移除lazy懒加载，避免图标加载时触发Suspense导致双重Loading
${iconImports.join('\n')}

const icons = {
${iconExports.join('\n')}
};

export default icons;
`;

// 4. 将内容写入到 index.js 文件
fs.writeFileSync(indexPath, fileContent.trim());

console.log('✅ Icon index generated successfully!');