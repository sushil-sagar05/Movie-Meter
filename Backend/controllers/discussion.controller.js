const { validationResult } = require('express-validator');
const discussion = require('../models/discussion.model');
const { getIo } = require('../Socket');
const User = require('../models/user.model');

module.exports.sendMessage = async (req, res, next) => {
  const { movieId } = req.params;
  const { message } = req.body;

  try {
    if (message.length === 0) {
      return res.status(401).json({ message: 'Invalid message' });
    }

    const user = await User.findById(req.user._id).select('fullname');
    const newMessage = {
      sender: req.user ? req.user._id : null,
      fullname: user ? user.fullname : 'Anonymous',
      message: message,
      timestamp: Date.now(),
    };
    let movieDiscussion = await discussion.findOne({ movieId });
    if (!movieDiscussion) {
      movieDiscussion = new discussion({ movieId });
    }

    movieDiscussion.messages.push(newMessage);
    await movieDiscussion.save();

    res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};




module.exports.getMessages = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const Discussion = await discussion.findOne({ movieId }).populate('messages.sender', 'fullname');
    if (!Discussion) {
      return res.status(404).json({ message: 'No discussion found for this movie' });
    }

    const messagesWithFullname = Discussion.messages.map(msg => ({
      ...msg._doc,
      fullname: msg.sender ? msg.sender.fullname : 'Anonymous'
    }));

    res.status(200).json(messagesWithFullname);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};