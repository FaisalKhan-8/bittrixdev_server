import express from "express";
import { CheckAdmin, VerifyUser } from "../middleware/Verify.middleware.js";
import { HeroSectionBanner } from "../controllers/HeroSection.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post(
    '/add-banner', VerifyUser, upload.single("hero"),  HeroSectionBanner 
)

export default router;