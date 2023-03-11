import mongoose from "mongoose";
const ComentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    AnimeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animes',
        required: true
    },
    blocked:{
        type: Boolean,
        default: false,
        required: true
    }
},{
    timestamps: true,
});
export default mongoose.model('Coments',ComentsSchema)