import jwt from 'jsonwebtoken';
import { ErrorHandle } from '../utils/ErrorHandle.js';

export const VerifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(ErrorHandle(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(ErrorHandle(401, 'Unauthorized'));
    }

    req.user = user;
    next();
  });
};

// Middleware to check if the user is an admin
export const CheckAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(ErrorHandle(403, 'Forbidden: Admins only'));
    }
    next();
  };


//   import express from 'express';
//   import { VerifyUser, CheckAdmin } from '../middleware/auth';
  
//   const router = express.Router();
  
//   // Admin routes
//   router.post('/add-data', VerifyUser, CheckAdmin, (req, res) => {
//     // Your logic to add data
//     res.send('Data added successfully!');
//   });
  
//   router.get('/dashboard', VerifyUser, CheckAdmin, (req, res) => {
//     res.send('Welcome to the admin dashboard!');
//   });
  
  export default router;
  