import path from 'path'

const segment1 = '/path/to';
const segment2 = 'file.txt';

const fullPath = path.join(segment1, segment2);

const fileName = path.basename(fullPath);
const dirName = path.dirname(fullPath);

// console.log('fullPath', fullPath);
// console.log('fileName', fileName);
// console.log('dirName', dirName);


const pathInfo = path.parse(fullPath);
// console.log(pathInfo);
// console.log(path);
console.log(process.cwd())

console.log(path.join(process.cwd(), '/index.js'))
console.log(import.meta.url)