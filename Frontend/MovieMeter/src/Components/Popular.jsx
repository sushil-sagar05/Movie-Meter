import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardSkelton from '../Components/Skelton/CardSkelton';

function Popular() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/popular`);
        setPopular(response.data.movies);
      } catch (error) {
        toast.error("Failed to load popular movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full flex flex-wrap justify-center gap-4 px-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkelton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {popular.map((pop, idx) => (
            <div
              key={idx}
              className="bg-[#141b23] border rounded-lg shadow-md overflow-hidden text-white"
            >
              <div className="flex justify-center pt-3 px-3">
                <div className="h-64 w-full">
                  <img
                    className="h-full w-full object-cover rounded-md"
                    src={pop.poster}
                    alt={pop.title}
                  />
                </div>
              </div>

              <div className="p-4 text-sm">
                <h3 className="text-[#bbb] mb-1 font-semibold">Title: {pop.title}</h3>
                <h3 className="text-[#bbb] mb-1">Director: {pop.director}</h3>
                <h3 className="text-[#bbb] mb-1">Cast: {pop.cast.slice(0, 2).join(', ')}</h3>
                <h3 className="text-[#bbb] mb-1">Release Date: {pop.year}</h3>
                <h3 className="text-[#bbb] mb-3">Rating: {pop.Avgrating}</h3>

                <div className="flex justify-between space-x-2">
                  <Link to={`/movie/${pop._id}/review`} className="w-1/2">
                    <button className="w-full bg-green-500 hover:bg-green-700 py-2 rounded-md font-semibold">
                      Review
                    </button>
                  </Link>
                  <Link to="/watchnow" className="w-1/2">
                    <button className="w-full bg-green-500 hover:bg-green-700 py-2 rounded-md font-semibold">
                      Watch Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Popular;
