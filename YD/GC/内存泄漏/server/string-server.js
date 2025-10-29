// 一个简单的字符串响应服务器
import http from 'http';

const server = http.createServer((req, res) => {
  res.end('Hello World'); // 每次请求都重新创建字符串
});

server.listen(3000, () => {
  console.log('[string-server] running on http://localhost:3000');
});
