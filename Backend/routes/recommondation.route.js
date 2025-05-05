const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { recommendation } = require('../controllers/recommendation.controller');
router.get('/recommondation',authMiddleware.authUser,recommendation)
module.exports = router