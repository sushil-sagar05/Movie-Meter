const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware')
router.get('/get-movies',
    [
       query('genre').optional().isString(), 
        query('year').optional().isNumeric(), 
        query('director').optional().isString(), 
      ],
movieController.getMovies
);
router.get('/random',movieController.RandomMovie)
router.get('/popular',movieController.Popular)
router.get('/movie/:movieId', movieController.getMovieById);
router.post('/addmovie',[
  body('title').isString().isLength({min:3}).withMessage("Invalid Title"),
  body('year').isNumeric().isLength({max:4}).withMessage("Invalid year"),
  body('plot').isString().isLength({min:3}).withMessage("Invalid plot"),
  body('genre').isString().isLength({min:3}).withMessage("Invalid genre"),
],authMiddleware.authUser,movieController.addMovie);
module.exports = router;