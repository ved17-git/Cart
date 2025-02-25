import express from 'express'
import 'dotenv/config'
import router from './Routes/route.js'
import cors from 'cors'


const app=express()
app.use(express.json())
app.use(cors());


app.use('/api', router)


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`);
})
