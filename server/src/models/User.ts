import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    encryptPassword: {
        type: String,
        required: false,
        trim: true
    },
    youtubeUser: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('User', userSchema)