import express from "express";
import { signInHandler, signUpHandler } from "../controllers/auth.controller.js";

const router = express.Router();

router
.post('/signup', signUpHandler)
.post('/signin', signInHandler)

export default router