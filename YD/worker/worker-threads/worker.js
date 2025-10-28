const { parentPort, workerData } = require('node:worker_threads')
let res = workerData * 2
parentPort.postMessage(res)