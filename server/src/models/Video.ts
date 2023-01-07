import { Schema, model } from "mongoose";

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'users'
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Video', videoSchema)