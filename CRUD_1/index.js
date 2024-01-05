import express, { json } from 'express'
import path from 'path'
import fs from 'fs'

const app = express();
const PORT = 3002;

app.set('view engine', 'ejs');
app.use(express.json())

const dataFilePath = path.join(__dirname, 'data.json');


async function readData(){

    try{
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);

    }
    catch(err){
        return [];
    }
}



app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`)
})
