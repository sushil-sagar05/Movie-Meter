const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie', 
        required: true,
    },
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, 
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('discussion', discussionSchema);