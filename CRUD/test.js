// const fs = require('fs')
// const path = require('path')


// const listFilesAndDirs = (directoryPath)=>{
//     fs.readdir(directoryPath, (err, files)=>{
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log("files ===>>>", files)

//         files.forEach((file)=>{
//             const fullPath = path.join(directoryPath, file)

//             fs.stat(fullPath, (err, stats)=>{
//                 if(err){
//                     console.log(err)
//                     return;
//                 }
//                 if(stats.isDirectory()){
//                     console.log(`${file} is a directory`)
//                 }
//                 else if(stats.isFile()){
//                     console.log(`${file} is a file`)
//                 }
//             })

            
//         })

//     })
// }

// listFilesAndDirs('/home/sanskar.mishra')






// const http = require('http')

// const server = http.createServer((req, res)=>{
    
//     res.writeHead(200, {'Content-type' : 'text/plain'})
//     res.end("Hello")
// })

// const PORT = 8000

// server.listen(PORT, ()=>{
//     console.log(`server running on PORT ${PORT}`)
// })