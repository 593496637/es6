const { marked } = require('marked');

/**
 * markdown-loader
 * 把 .md 文件转成 JS 模块，导出 HTML 字符串
 */
module.exports = function markdownLoader(source) {
  const html = marked.parse(source);
  return `module.exports = ${JSON.stringify(html)};`;
};
