const mongoose = require('mongoose');
const { Schema } = mongoose;

const MsgSchema = new Schema({
    in_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
    },
    out_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
    },
    msg: {
        type: String,
        required: true,
    },
});

const Message = mongoose.model('messages', MsgSchema);
module.exports = Message;