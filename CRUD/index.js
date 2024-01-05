import express from 'express'
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'


const app = express();

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/crud_app')


app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)


const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`)
})