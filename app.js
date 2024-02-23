import express from "express";
import connect from "./schemas/index.js";
import WriteRouter from './routes/writing.router.js'

const app = express()

connect()

app.listen(8080,function () {
    console.log("welcome node.js");
})

app.get('/',(req,res,next)=>{
    return res.json({Messeage:"Hi"})
})

app.use('/api',[WriteRouter])
