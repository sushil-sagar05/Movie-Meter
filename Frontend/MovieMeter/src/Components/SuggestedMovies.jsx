import React, { useState, useContext, useEffect } from 'react';
import { UserDataContext } from '../Context/UserDataContext';
import axios from 'axios';
import CardSkelton from '../Components/Skelton/CardSkelton';
import { Link } from 'react-router-dom';
function SuggestedMovies({ isliked,isfavourite }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);


useEffect(() => {
  const fetchRecommended = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/recommondations/recommondation`,
        { withCredentials: true }
      );
      setMovies(response.data)
      setLoading(false)
    } catch (error) {
       toast.error(error.response.data.message)
    }
  };

  fetchRecommended();
}, [isliked,isfavourite]);

  return (
    <>
      {loading ? (
        <div className="w-full flex flex-wrap justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkelton key={i} />
          ))}
        </div>
      ) : (
        <div className="text-white p-4">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-center text-2xl md:text-3xl font-semibold mb-6">
              You may also like
            </h1>
            {movies.length === 0 ? (
              <p className="text-center text-lg text-gray-300">
                No suggestions available at the moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.slice(0,8).map((movie, id) => (
                  <div
                    key={id}
                    className="bg-[#008080] border-2 shadow-md rounded-md p-3 flex flex-col items-center"
                  >
                    <div className="w-full h-48 sm:h-64 md:h-72 mb-3">
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={movie.poster}
                        alt={movie.title}
                      />
                    </div>
                    <div className="text-sm w-full">
                      <p className="font-medium">Name: {movie.title.toUpperCase()}</p>
                      <p>
                        Genre:{' '}
                        {movie.genres && movie.genres.length > 0
                          ? movie.genres.join(', ')
                          : 'N/A'}
                      </p>
                    </div>
                    <Link to={`/movie/${movie._id}`}><button className='h-[6vh] w-[16vw] m-1 rounded-lg text-white bg-green-500 hover:bg-green-800 hover:border-2 shadow-md'>Review</button></Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SuggestedMovies;
