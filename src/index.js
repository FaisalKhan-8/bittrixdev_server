import express from "express";
import 'dotenv/config'
import { DataBase } from "./utils/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())



// Routes import here...
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)


// Error middleware....
// This middleware catches any errors that occur in the previous middleware or route handlers.
// By placing it at the end, it ensures that it can catch and handle errors that happen anywhere in the application.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

// DATA BASE CONFIG AND SERVER CONFIG
DataBase()
.then(() => {
    app.listen(process.env.PORT || 8080,() => {
        console.log(`server listening on port ${process.env.PORT}`);
    })
});











