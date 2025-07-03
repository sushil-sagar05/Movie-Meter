import React, { useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import Rating2 from '../Components/svgs/Rating2';
import Rating3 from '../Components/svgs/Rating3';
import Rating4 from '../Components/svgs/Rating4';
import Footer from '../Components/Footer';
import RandomMovie from '../Components/RandomMovie';
import Popular from '../Components/Popular';
import Community from '../Components/Community';
import MoviesForYou from '../Components/MoviesForYou';
import { UserDataContext } from '../Context/UserDataContext';
import StartLoader from '../Components/StartLoader';

function Home() {
  const { user } = useContext(UserDataContext);
  const expectedLoads = user ? 3 : 2;
  const [loadedCount, setLoadedCount] = useState(0);
  const isLoading = loadedCount < expectedLoads;

  const handleLoad = () => {
    setLoadedCount((prev) => {
      console.log('Component loaded', prev + 1);
      return prev + 1;
    });
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-[#111111] text-white">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#111111]">
          <StartLoader />
        </div>
      )}

      <div className={isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar />

        <section className="flex flex-col items-center justify-center px-4 py-10 text-center">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Connecting movie lovers across the globe
            </h2>
            <p className="mt-4 text-sm sm:text-base">
              A Place to Talk Movies, Share Opinions, and Make Connections!
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl underline text-yellow-300 pt-10 font-extrabold">Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full max-w-6xl px-4">
            <div className="flex flex-col items-center justify-center min-h-48">
              <Rating4 />
              <p className="p-2 text-base sm:text-xl font-semibold">Rating</p>
            </div>
            <div className="flex flex-col items-center justify-center min-h-48">
              <Rating3 />
              <p className="p-2 text-base sm:text-xl font-semibold">Like/Dislikes</p>
            </div>
            <div className="flex flex-col items-center justify-center min-h-48">
              <Rating2 />
              <p className="p-2 text-base sm:text-xl font-semibold">Discussion</p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">Movie Of The Day</h2>
          <div className="flex justify-center">
            <RandomMovie onLoad={handleLoad} />
          </div>
        </section>

        {user && (
          <section className="w-full py-10 px-4">
            <MoviesForYou onLoad={handleLoad} />
          </section>
        )}

        <section className="w-full py-10 px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">Popular Movies</h2>
          <div className="flex justify-center">
            <Popular onLoad={handleLoad} />
          </div>
        </section>
        <section className="w-full py-10 px-4 text-center">
          <h2 className="text-4xl font-serif text-yellow-500 mb-2">MovieMeter</h2>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">About Us</h2>
          <p className="max-w-3xl mx-auto text-lg">
            "Welcome to MovieMeter, the ultimate community for movie lovers! We’re a passionate group of film enthusiasts
            dedicated to exploring and discussing everything cinema has to offer. Whether you're into classic films,
            modern blockbusters, or hidden indie
            opinions, reviews, and recommendations.
            <br /><br />
            Our mission is to create a space where you can connect with fellow movie lovers, discover new films,
            and engage in insightful discussions. Join us in celebrating the art of storytelling through film —
            <span className="text-yellow-500"> because every movie is better when you experience it with others!</span>"
          </p>
        </section>

        <section className="w-full py-10 px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">What our Community Says</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Community />
          </div>
        </section>

        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Home;
