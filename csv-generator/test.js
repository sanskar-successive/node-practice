const fs = require('fs');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const readline = require('readline');

// Function to read a portion of the CSV file using streams
function readCSVChunk(start, end, filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8', start, end });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    // Process each line of the CSV file
    console.log(`Thread ${workerData.id} processed line: ${line}`);
  });

  rl.on('close', () => {
    parentPort.postMessage(`Worker ${workerData.id} finished processing`);
  });
}

// Main thread logic
if (isMainThread) {
  const numThreads = 4;

  // Calculate chunk size for each thread
  const fileStats = fs.statSync('books_data1.csv');
  const fileSize = fileStats.size;
  const chunkSize = Math.ceil(fileSize / numThreads);

  // Create worker threads
  for (let i = 0; i < numThreads; i++) {
    const start = i * chunkSize;
    const end = (i + 1) * chunkSize - 1;

    const worker = new Worker(__filename, {
      workerData: { id: i, start, end, filePath: 'books_data1.csv' }, // Provide the file path
    });

    worker.on('message', (msg) => {
      console.log(`Main thread received message from worker ${i}: ${msg}`);
    });

    worker.on('error', (err) => {
      console.error(`Worker ${i} encountered an error: ${err}`);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker ${i} exited with code ${code}`);
      }
    });
  }
} else {
  // Worker thread logic
  readCSVChunk(workerData.start, workerData.end, workerData.filePath);
}
