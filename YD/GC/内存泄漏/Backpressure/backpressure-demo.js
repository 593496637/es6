// 🧮 案例 4：背压（Backpressure）机制演示

import fs from 'fs'
const readable = fs.createReadStream('./big.mp4', { highWaterMark: 16 * 1024 * 1024 }); // 每次读16MB
const writable = fs.createWriteStream('./copy-backpressure.mp4')
readable.on('data', (chunk) => {
  const ok = writable.write(chunk)
  if (!ok) {
    console.log('💧 写入太快，暂停读取');
    readable.pause()
  }
})
writable.on('drain', () => {
  console.log('💧 写入完成，恢复读取');
  readable.resume()
})
writable.on('finish', () => {
  console.log('💧 写入完成');
})
readable.on('end', () => {
  console.log('💧 读取完成');
  writable.end()
})
readable.on('error', (err) => {
  console.log('💧 读取错误', err);
})
writable.on('error', (err) => {
  console.log('💧 写入错误', err);
})