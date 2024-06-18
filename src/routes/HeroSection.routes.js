import express from "express";
import { CheckAdmin, VerifyUser } from "../middleware/Verify.middleware.js";
import { HeroSectionBannerUpload } from "../controllers/HeroSection.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post(
    '/add-banner', VerifyUser, upload.single("hero"),  HeroSectionBannerUpload 
)

export default router;