import mongoose from "mongoose";
const SeriesSchema = new mongoose.Schema({
    season: {
        type: String,
        required: true,
        default: 0
    },
    Series: {
        type: Array,
        required: true,
    },
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animes',
        required: true
    },

},{
    timestamps: true,
});
export default mongoose.model('Series',SeriesSchema)