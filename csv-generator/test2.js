const fs = require('fs');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const readline = require('readline');

// Function to read and process CSV rows using streams
function readCSVRows(filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const rows = [];

  rl.on('line', (line) => {
    // Process each line of the CSV file
    rows.push(line);

    // Assuming CSV rows end with a newline character
    if (line.endsWith('\n')) {
      processRows(rows);
      rows.length = 0; // Clear the array for the next set of rows
    }
  });

  rl.on('close', () => {
    if (rows.length > 0) {
      processRows(rows); // Process any remaining rows
    }
    parentPort.postMessage(`Worker ${workerData.id} finished processing`);
  });
}

// Function to process complete CSV rows
function processRows(rows) {
  // Process the rows as needed
  console.log(`Thread ${workerData.id} processed rows:`, rows);
}

// Main thread logic
if (isMainThread) {
  const numThreads = 4;

  // Create worker threads
  for (let i = 0; i < numThreads; i++) {
    const worker = new Worker(__filename, {
      workerData: { id: i, filePath: 'books_data1.csv' }, // Provide the file path
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
  readCSVRows(workerData.filePath);
}
