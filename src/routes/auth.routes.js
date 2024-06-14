import express from "express";
import { signUpHandler } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signUpHandler)

export default router