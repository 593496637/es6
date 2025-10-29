// 一个使用 Buffer 的服务器，性能更好
import http from 'http';

const msg = Buffer.from('Hello World'); // 预创建一次 Buffer

const server = http.createServer((req, res) => {
  res.end(msg); // 每次直接发送 Buffer，避免重复编码
});

server.listen(3001, () => {
  console.log('[buffer-server] running on http://localhost:3001');
});
