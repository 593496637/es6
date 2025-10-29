// 📦 案例 2：Stream 复制大文件（对比内存占用）

import fs from 'fs'
console.time('stream-copy')
fs.createReadStream('./big.mp4').pipe(fs.createWriteStream('./copy-stream.mp4')).on('finish', () => {
  console.timeEnd('stream-copy')
})