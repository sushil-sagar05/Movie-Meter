const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const reviewController = require('../controllers/review.controller')

router.post('/:movieId/postreviews',[
    body('comment').isString().isLength({min:15, max:100}).withMessage("Review must be 15 character long"),
    body('rating').isNumeric().isIn([1,2,3,4,5]).withMessage("Invalid Rating"),

],authMiddleware.authUser,reviewController.postReview);
router.get('/:movieId/getreviews',authMiddleware.authUser,reviewController.getReview);
router.get('/getallreview',authMiddleware.authUser,reviewController.getuserReview)

module.exports = router;