const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
    },
    userName: {
        type: String,
        required: true,
    },
    userImg: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likers: {
        type: Array,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model('posts', UserSchema);
module.exports = Post;