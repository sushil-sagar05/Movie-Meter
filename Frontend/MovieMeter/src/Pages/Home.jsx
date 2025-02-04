import React,{useState,useRef} from 'react'
import Navbar from '../Components/Navbar'
import Rating1 from '../Components/svgs/Rating1'
import Rating2 from '../Components/svgs/Rating2'
import Rating3 from '../Components/svgs/Rating3'
import Rating4 from '../Components/svgs/Rating4'
import { FaRegUser } from "react-icons/fa6";
import Footer from '../Components/Footer'
import RandomMovie from '../Components/RandomMovie'
import Popular from '../Components/Popular'

function Home() {
  return (
    <div className='w-full ' style={{ overflowX: 'hidden' }}>
      <div className="header w-full">
        <Navbar />
      </div>
      <div className="H flex justify-center items-center">
        <div className="hero h-screen bg-[#111111] w-full">
          <div className="upperHero">
            <h2 className='text-5xl text-center pt-5 text-white font-semibold'>Connecting Movie Lovers Across the World...</h2>
            <hr className='mt-6' />
            <div className='flex justify-center items-center'>
              <h2 className='font-bold bg-[#0d1017] flex gap-3 py-6 text-white text-2xl'>
                <h4>Review</h4>
                <h4 className='text-yellow-500'>Share</h4>
                <h4>Recommend</h4>
              </h2>
            </div>
          </div>
          <div className='features bg-[#111111] flex justify-center items-center w-full'>
            <div className="featurews w-full">
              <h3 className="text-white text-center text-5xl font-semibold">Features</h3>
              <div className="container md:flex  mt-5">
                <div className="First flex justify-center w-full items-center h-1/4">
                  <h3 className='text-3xl font-semibold pl-2 text-yellow-300'>Featured Rating</h3>
                  <div className='w-1/2 mr-6'>
                    <Rating4 />
                  </div>
                </div>
                <div className="second h-1/4">
                  <div className="First flex justify-center w-full items-center h-1/4">
                    <h3 className='text-3xl font-semibold pl-2 text-white'>Featured Review</h3>
                    <div className='w-1/2'>
                      <Rating3 />
                    </div>
                  </div>
                </div>
                <div className="third h-1/4">
                  <div className="First flex justify-center w-full items-center h-1/4">
                    <h3 className='text-3xl font-semibold pl-2 text-red-500'>Live Discussion</h3>
                    <div className='w-1/2'>
                      <Rating2 />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mdscreen">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='Movie-of-day pt-16 bg-[#111111] w-full'>
        <h2 className='text-white text-4xl font-semibold text-center pb-5'>Movie Of The Day</h2>
        <div className='flex justify-center items-center'>
          <RandomMovie />
        </div>
      </div>
      <div className="Latest bg-[#111111] w-full">
        <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Popular Movies</h2>
        <div>
          <Popular />
        </div>
      </div>
      <div className="About-Us pt-9 bg-[#111111] w-full">
        <h2 className='text-4xl font-serif text-center pb-2 text-yellow-500'>MovieMeter</h2>
        <h2 className='text-white text-4xl font-semibold text-center pb-5'>About Us</h2>
        <p className='text-lg pl-3 text-white'>"We are passionate about connecting movie lovers with the best films and reviews. Our mission is to provide an engaging platform where you can discover new movies, read insightful reviews, and share your own thoughts with a community of fellow film enthusiasts."</p>
      </div>
      <div className="Community h-screen pt-9 bg-[#111111] w-full">
        <h2 className='text-white text-4xl font-semibold text-center'>What our Community Says</h2>
        <div className='h-40 rounded-lg shadow-md w-80 bg-white mt-8 ml-6'>
          <div className="content h-24 flex pt-5 pl-3">
            <div className="user h-1/2 text-7xl"><FaRegUser /></div>
            <div className="name h-1/2 text-2xl">
              <div className="namee">Sushil Sagar</div>
              <div className="pesa">Blogger</div>
            </div>
          </div>
          <div className="message pl-3">
            <h2>"Awesome List of Movies"</h2>
            ⭐⭐⭐⭐⭐
          </div>
        </div>
        <div className='h-40 rounded-lg shadow-md w-80 bg-white mt-8 ml-6'>
          <div className="content h-24 flex pt-5 pl-3">
            <div className="user h-1/2 text-7xl"><FaRegUser /></div>
            <div className="name h-1/2 text-2xl">
              <div className="namee">Sushil Sagar</div>
              <div className="pesa">Blogger</div>
            </div>
          </div>
          <div className="message pl-3">
            <h2>"Awesome List of Movies"</h2>
            ⭐⭐⭐⭐⭐
          </div>
        </div>
      </div>
      <div className="footer bg-[#111111] w-full" style={{ overflowX: 'hidden' }}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;