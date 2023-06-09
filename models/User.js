import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    profileDesc: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'Пользователь'
    },
    isActivated: {type: Boolean,default: false},
    isPrivacy: {type: Boolean,default: false},
    forCheckProfile: {type: mongoose.Types.ObjectId,default: function () { return new mongoose.Types.ObjectId}},
    activationLink: {type: String},
    optionsofanime: [{
        status: {
            type: String,
            required: true
        },
        AnimeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animes',
            required: true,
        }
    }],
    avatarUrl: String,
},{
    timestamps: true,
});
export default mongoose.model('User',UserSchema)