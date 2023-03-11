import mongoose from "mongoose";
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});
export default mongoose.model('News',NewsSchema)