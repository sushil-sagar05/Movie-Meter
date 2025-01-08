const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const movieController = require('../controllers/movie.controller')
router.get('/get-movies',
    [
       query('genre').optional().isString(), 
        query('year').optional().isNumeric(), 
        query('director').optional().isString(), 
      ],
movieController.getMovies
)
router.get('/:id', movieController.getMovieById);
module.exports = router;