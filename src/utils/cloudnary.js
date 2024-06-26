import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;
        // uplaod on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        fs.unlinkSync(localFilePath);
        console.log("upload on cloudinary: ", response.url);
        return response;

    } catch (error) {
        // remove temporary file from local storage
        fs.unlinkSync(localFilePath);
        return null;
        
    }
}

export {uploadOnCloudinary}
