import express from "express";
import 'dotenv/config'
import { DataBase } from "./utils/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser";

// DATA BASE CONFIG
DataBase()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())



// Routes import here...
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)


app.listen(process.env.PORT || 8080,() => {
    console.log(`server listening on port ${process.env.PORT}`);
})

// Error middleware....
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });



