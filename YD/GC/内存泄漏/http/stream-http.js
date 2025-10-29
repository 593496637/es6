// 🧩 案例 3：HTTP 文件下载流

// stream-http.js
import http from 'http';
import fs from 'fs';

http.createServer((req, res) => {
  const stream = fs.createReadStream('./big.mp4');
  stream.pipe(res);
}).listen(3002, () => console.log('流式下载服务运行于 http://localhost:3002'));
