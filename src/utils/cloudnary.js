import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, { resource_type: "auto" }, (error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
            } else {
                // Delete the local file after uploading
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Failed to delete local file:", err);
                    }
                });
                resolve(result);
            }
        });
    });
};

