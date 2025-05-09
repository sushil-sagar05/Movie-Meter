import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardSkelton from '../Components/Skelton/CardSkelton';
import { toast } from 'react-toastify';

function RandomMovie() {
  const [random, setRandom] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/random`);
        setRandom(data.movie);
      } catch (error) {
        toast.error('Failed to fetch random movie.');
      } finally {
        setLoading(false);
      }
    };
    fetchRandom();
  }, []);

  return (
    <div className="w-full px-4">
      {loading ? (
        <div className="flex justify-center">
          <CardSkelton />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#141b23] p-6 rounded-lg shadow-md text-white">
          <div className="col-span-1 flex flex-col md:flex-row items-center md:items-start">
            <img
              className="w-64 h-80 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
              src={random.poster}
              alt={random.title}
            />
            <div className="text-sm space-y-2 w-full">
              <p><strong>Name:</strong> {random.title.toUpperCase()}</p>
              <p><strong>Director:</strong> {random.director ?? 'Unknown'}</p>
              <p><strong>Cast:</strong> {random.cast?.slice(0, 2).join(', ') ?? 'Unknown'}</p>
              <p><strong>Release:</strong> {random.year}</p>
              <p><strong>Rating:</strong> {random.Avgrating}</p>
              <Link to="/watchnow">
                <button className="mt-3 w-28 h-10 bg-green-500 hover:bg-green-700 rounded-md font-semibold">
                  Watch Now
                </button>
              </Link>
            </div>
          </div>
          <div className="col-span-2 hidden sm:block">
            <h2 className="text-lg font-semibold mb-2">Why This Movie?</h2>
            <p className="text-sm leading-relaxed text-gray-200">
              Each day, we highlight a movie that deserves your attention — from iconic classics to hidden gems and the latest releases. Explore the film's plot, themes, and characters, and get a deeper understanding of what makes it special.
              After watching, join the community discussion and share your thoughts, opinions, and interpretations. Whether you're a casual viewer or a film enthusiast, the "Movie of the Day" is the perfect way to discover something new and connect with fellow movie lovers.
              Don’t miss out — come back every day for a fresh cinematic experience!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomMovie;
