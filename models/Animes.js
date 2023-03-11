import mongoose from "mongoose";
const AnimesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,

    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    imageFontUrl: String,
    screensUrls: Array,
    starsratings: [{
        star: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }]
},{
    timestamps: true,
});
export default mongoose.model('Animes',AnimesSchema)