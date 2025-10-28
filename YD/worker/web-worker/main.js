const worker = new Worker('worker.js');
worker.postMessage({ start: 1 });
worker.onmessage = (e) => console.log('Result:', e.data);
