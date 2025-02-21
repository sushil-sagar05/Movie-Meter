import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Link to={`/movie/${movie._id}`}>
     <div className='grid grid-cols-4 gap-3 w-80 h-full rounded-lg border text-white'>
     <div>
     <div className='image h-52 w-80 p-2 rounded-lg '>
      <img className='h-full w-full rounded-lg' src={movie.poster} alt="" />
      </div>
      <div className='content h-36 p-3 w-80 '>
         <h2>{movie.title}</h2>
         <h2>Director: {movie.director}</h2>
         <h2>Cast: {movie.cast}</h2>
         <h2>Release date: {movie.year}</h2>
      </div>
      <div className="btns p-3 flex justify-center text-center w-80 items-center">
      <div className="Review bg-green-500 h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
      <div className="Watch Now bg-green-500 w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>GO To Discussion</button></div>
      </div>
     </div>
     </div>
      </Link>
    </div>
  );
}

export default MovieCard;