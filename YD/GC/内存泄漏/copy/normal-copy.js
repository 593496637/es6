// 📦 案例 2：Stream 复制大文件（对比内存占用）

import fs from 'fs'
console.time('sync-copy')

const data = fs.readFileSync('./big.mp4')
fs.writeFileSync('./copy-sync.mp4', data)
console.timeEnd('sync-copy')