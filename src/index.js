import express from "express";
import 'dotenv/config'
import { DataBase } from "./utils/db.js";

// DATA BASE CONFIG
DataBase()

const app = express()

app.get('/', (req, res)=>{
    res.json({"message": "hello from server!!"})
})


app.listen(process.env.PORT || 8080,() => {
    console.log(`server listening on port ${process.env.PORT}`);
})

