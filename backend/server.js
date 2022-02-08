
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import morgan from 'morgan'
import registerRoutes from './routes/registerRoutes.js'
import reportsRoutes from './routes/reportsRoutes.js'


dotenv.config()
connectDB()
const __dirname = path.resolve()
const app = express();

app.use(express.json())
app.use(cors({
  origin:"*"
}));

app.use('/api/students', registerRoutes);
app.use('/api/reports', reportsRoutes);


if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
  app.use(express.static(path.join(__dirname,'/client/build')))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold));

