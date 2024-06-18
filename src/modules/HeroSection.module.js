import mongoose, { Schema } from "mongoose";

const HeroSectionBannerSchema = new Schema({
    videoUrl: {
        type: String, 
        required: true 
    }

})

const Banner = mongoose.model("HeroSectionBanner", HeroSectionBannerSchema)

export default Banner;