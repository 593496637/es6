import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  res.write('<html><head><title>BigPipe Demo</title></head><body>');
  res.write('<h2>Header 区块加载完成 ✅</h2>');

  setTimeout(() => {
    res.write('<div>🚀 内容块 A 加载完成</div>');
  }, 1000);

  setTimeout(() => {
    res.write('<div>🔥 内容块 B 加载完成</div>');
  }, 2000);

  setTimeout(() => {
    res.end('<footer>💡 所有内容加载完毕</footer></body></html>');
  }, 3000);
}).listen(3000);

console.log('BigPipe demo running on http://localhost:3000');
