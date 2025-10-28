const { Worker } = require('node:worker_threads')
const worker = new Worker('./worker.js', { workerData: 10 })
worker.on('message', console.log)