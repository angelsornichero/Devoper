import { Schema, model } from "mongoose";



const commentsSchema = new Schema({
    comment: {
        type: String, 
        required: true, 
        trim: true
    }, 
    userId: {
        type: Schema.Types.ObjectId, 
        required: true, 
        trim:  true, 
        ref: 'users'
    }
}, {
    timestamps: true,
    versionKey: false
})

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true, 
        trim:  true, 
        ref: 'users'
    }
}, {
    timestamps: true,
    versionKey: false
})

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
    },
    area: {
        type: String,
        required: true,
        trim: true 
    },
    comments: [commentsSchema],
    likes: [likeSchema]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Video', videoSchema)