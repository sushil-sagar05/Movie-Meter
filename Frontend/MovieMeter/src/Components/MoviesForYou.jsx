import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardSkelton from '../Components/Skelton/CardSkelton';
import { toast } from 'react-toastify';
import { UserDataContext } from '../Context/UserDataContext';

function MoviesForYou() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recommondations/recommondation`, {
          withCredentials: true,
        });
        if (Array.isArray(response.data) && response.data[1].length === 0) {
            setMovies([]);
            setMessage(response.data[0]); 
          } else {
            setMovies(response.data); 
            setMessage('');
          }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div className="w-full px-4 py-10">
      <h2 className="text-white text-3xl sm:text-4xl font-semibold text-center mb-8">
        Movies For You
      </h2>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkelton key={i} />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="flex justify-center">
          <div className="bg-[#141b23] text-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
            <h3 className="text-xl font-semibold mb-2">No Recommendations Yet</h3>
            <p className="text-sm">Your recommended movies will appear here once our system has enough data based on your activity.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {movies.map((movie, idx) => (
            <div
              key={idx}
              className="bg-[#141b23] rounded-lg shadow-md text-white overflow-hidden"
            >
              <Link to={`/movie/${movie._id}`}>
                <img
                  className="h-64 w-full object-cover"
                  src={movie.poster}
                  alt={movie.title}
                />
              </Link>
              <div className="p-4 text-sm">
                <p><strong>Title:</strong> {movie.title}</p>
                <p><strong>Director:</strong> {movie.director ?? 'Unknown'}</p>
                <p><strong>Cast:</strong> {movie.cast?.slice(0, 2).join(', ') ?? 'Unknown'}</p>
                <p><strong>Release:</strong> {movie.year}</p>
                <p><strong>Rating:</strong> {movie.Avgrating}</p>
                <div className="mt-3 flex gap-2">
                  <Link to={`/movie/${movie._id}/review`} className="w-1/2">
                    <button className="w-full bg-green-500 hover:bg-green-700 py-2 rounded-md font-semibold">
                      Review
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesForYou;
