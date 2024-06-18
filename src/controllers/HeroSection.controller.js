import Banner from "../modules/HeroSection.module.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ErrorHandle } from "../utils/ErrorHandle.js";

// TODO: Add small video also in this db or Logic

export const HeroSectionBanner = async (req, res, next) => {
    // Add a console log to check the content of req.file
    console.log('req.file:', req.file);

    // Ensure req.file exists and has a property 'path'
    const HeroVideoLocalPath = req.file?.path;
    if (!HeroVideoLocalPath) {
        return next(ErrorHandle(400, "Hero Video is required"));
    }

    try {
        // Save the hero video to Cloudinary
        const heroVideo = await uploadOnCloudinary(HeroVideoLocalPath);
        if (!heroVideo) {
            return next(ErrorHandle(500, "Failed to upload hero video to cloudinary"));
        }

        // Save the hero video URL to the database
        await Banner.create({ videoUrl: heroVideo.url || "" });

        // Send a successful response
        res.status(201).json({
            message: "Hero video uploaded successfully",
            videoUrl: heroVideo.url || "",
        });
    } catch (error) {
        // Handle any other errors
        return next(ErrorHandle(500, error.message || "An error occurred while processing the request"));
    }
};
