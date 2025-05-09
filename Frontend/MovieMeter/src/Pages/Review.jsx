import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CardSkelton from '../Components/Skelton/CardSkelton';
import Pagination from '../Components/Pagination';

function Contact() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(3);
  const LIMIT = 25;

  useEffect(() => {
    const fetchMovies = async (page) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/get-movies`, {
          params: { page, limit: LIMIT },
        });
        setData(response.data.movies);
        setTotalMovies(response.data.total);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalMovies / LIMIT);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#111111] min-h-screen" style={{ overflowX: 'hidden' }}>
      <Navbar />

      <div className="text-center pt-10">
        <h2 className="text-white text-4xl font-semibold">Review</h2>
        <h2 className="text-2xl text-yellow-500 font-semibold pt-3">
          Give Back To Community. Review and Rate Movies
        </h2>
        <h2 className="text-sm text-white font-semibold pt-1">
          So Others Don't Have to Brainstorm Here and There..
        </h2>
        <hr className="my-6 border-gray-600 w-2/3 mx-auto" />
      </div>

      {loading ? (
        <div className="flex flex-wrap justify-center items-center gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkelton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-8 px-4 pb-8">
          {data.map((movie, idx) => (
            <div key={idx} className="bg-[#141b23] rounded-lg shadow-md w-72 sm:w-80">
              <div className="h-64 w-full">
                <img
                  className="h-full w-full rounded-lg object-cover"
                  src={movie.poster}
                  alt={movie.title}
                />
              </div>
              <div className="p-4 text-white">
                <p className="text-sm">
                  <strong>Title:</strong> {movie.title.toUpperCase()}
                </p>
                <p className="text-sm">
                  <strong>Director:</strong> {movie.director || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Cast:</strong> {movie.cast?.slice(0, 2).join(', ') || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Rating:</strong> {movie.Avgrating ?? 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Release:</strong> {movie.year}
                </p>
                <div className="flex justify-center mt-4">
                  <Link to={`/movie/${movie._id}/review`}>
                    <button className="bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg">
                      Review
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center my-6">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
