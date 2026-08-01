import React, { useState, useContext, useCallback } from 'react';
import Navbar from '../Components/Navbar';
import Discusion from '../assets/Group-discussion.png';
import Expression from '../assets/expression.png';
import Rating from '../assets/rating.png';
import Footer from '../Components/Footer';
import RandomMovie from '../Components/RandomMovie';
import Popular from '../Components/Popular';
import Community from '../Components/Community';
import MoviesForYou from '../Components/MoviesForYou';
import { UserDataContext } from '../Context/UserDataContext';
import StartLoader from '../Components/StartLoader';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useContext(UserDataContext);
  const expectedLoads = user ? 3 : 2;
  const [loadedCount, setLoadedCount] = useState(0);
  const isLoading = loadedCount < expectedLoads;

  const handleLoad = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-white">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full animate-pulse"></div>
            <StartLoader />
          </div>
        </div>
      )}

      <div className={isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar />
        <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/8 via-transparent to-yellow-300/8"></div>
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-52 h-52 bg-yellow-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-10 w-28 h-28 bg-yellow-600/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 max-w-7xl">
            <div className="mb-20">
              <div className="mb-8">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent leading-tight mb-4">
                  Connecting Movie Lovers
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Across the Globe
                </h2>
              </div>
              
              <p className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                A Place to Talk Movies, Share Opinions, and Make Connections!
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to='/login'><button className="group relative px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold text-xl rounded-full hover:from-yellow-400 hover:to-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/40 overflow-hidden">
                  <span className="relative z-10">Join the Community</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                </Link>
                <Link to='/movies'><button className="px-10 py-4 border-2 border-yellow-400 text-yellow-400 font-bold text-xl rounded-full hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  Explore Movies
                </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-16">
                What Makes Us Special
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-10 border border-gray-700/50 hover:border-yellow-500/70 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1">
                    <div className="flex justify-center mb-8 transform group-hover:scale-125 transition-transform duration-500">
                    <img src={Rating} alt="Rating" />
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">Smart Rating</h4>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      Rate movies with our intelligent system and discover films that match your taste perfectly
                    </p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-10 border border-gray-700/50 hover:border-yellow-500/70 transition-all duration-500 hover:transform hover:scale-105 hover:-rotate-1">
                    <div className="flex justify-center mb-8 transform group-hover:scale-125 transition-transform duration-500">
                      <img src={Expression} alt="Expression" />
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">Express Yourself</h4>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      Like, dislike, and share your honest opinions with a community that values your voice
                    </p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-10 border border-gray-700/50 hover:border-yellow-500/70 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1">
                    <div className="flex justify-center mb-8 transform group-hover:scale-125 transition-transform duration-500">
                      <img src={Discusion} alt="Discussion" />
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">Deep Discussions</h4>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      Engage in meaningful conversations about plot twists, cinematography, and everything cinema
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative w-full py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-300/5"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-300/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Movie Of The Day
            </h2>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-2 border border-gray-700/30">
                  <RandomMovie onLoad={handleLoad} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {user && (
          <section className="relative w-full py-16 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-yellow-500/5 to-yellow-300/5"></div>
            <div className="relative z-10">
              <MoviesForYou onLoad={handleLoad} />
            </div>
          </section>
        )}
        <section className="relative w-full py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-300/5"></div>
          <div className="absolute top-10 right-10 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Popular Movies
            </h2>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-2 border border-gray-700/30">
                  <Popular onLoad={handleLoad} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative w-full py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/8 via-transparent to-yellow-300/8"></div>
          <div className="absolute top-0 left-1/3 w-36 h-36 bg-yellow-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-44 h-44 bg-yellow-300/15 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-5xl sm:text-6xl font-serif bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                MovieMeter
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-white">About Us</h3>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-3xl p-12 border border-gray-700/40 max-w-4xl mx-auto">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light">
                "Welcome to MovieMeter, the ultimate community for movie lovers! We're a passionate group of film enthusiasts
                dedicated to exploring and discussing everything cinema has to offer. Whether you're into classic films,
                modern blockbusters, or hidden indie gems, you'll find your tribe here sharing
                opinions, reviews, and recommendations.
                <br /><br />
                Our mission is to create a space where you can connect with fellow movie lovers, discover new films,
                and engage in insightful discussions. Join us in celebrating the art of storytelling through film —
                <span className="text-yellow-400 font-semibold"> because every movie is better when you experience it with others!</span>"
              </p>
            </div>
          </div>
        </section>
        <section className="relative w-full py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-yellow-500/5 to-yellow-300/5"></div>
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-16 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              What Our Community Says
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <Community />
            </div>
          </div>
        </section>
        <footer className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="relative z-10">
            <Footer />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
