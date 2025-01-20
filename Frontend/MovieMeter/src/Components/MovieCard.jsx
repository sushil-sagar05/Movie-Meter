import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className=''>
      <Link to={`/movie/${movie._id}`}>
        <div className='bg-[#141b23] rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-72 w-80">
            <img className='h-full w-full rounded-lg' src={movie.poster} alt={movie.title} />
          </div>
          <div className="content flex">
            <div className="name text-[#797d80] text-sm">
              <span className='ml-1'>{movie.title}</span>
              <span className='ml-2'>Director: {movie.director}</span>
              <div>
                <span className='ml-2'>Cast: {movie.cast}</span>
                <span className='ml-2'>Release date: {movie.year}</span>
                <span>Review: 5★★★★★</span>
              </div>
              <div className='flex justify-around text-white items-center text-center pt-3'>
                <div className="Review bg-yellow-500 h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
                <div className="Watch Now bg-yellow-500 w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>GO To Discussion</button></div>
              </div>
              <div><h4 className='text-sm'>Get Ai Powered StoryLine of this Movie?</h4><button className='bg-white w-1/2 rounded-lg h-8 font-semibold text-black'>Click Here</button></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;