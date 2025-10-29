import http from 'http'
import fs from 'fs'
import zlib from 'zlib'

http.createServer((req, res) => {
  const readStream = fs.createReadStream('./big.mp4')
  const gzip = zlib.createGzip()
  res.writeHead(200, { 'Content-Encoding': 'gzip' })
  readStream.pipe(gzip).pipe(res)
}).listen(3003, () => {
  console.log('gzip-server running on http://localhost:3003');
})