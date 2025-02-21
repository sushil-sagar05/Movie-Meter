import React,{useState,useRef} from 'react'
import Navbar from '../Components/Navbar'
import Rating1 from '../Components/svgs/Rating1'
import Rating2 from '../Components/svgs/Rating2'
import Rating3 from '../Components/svgs/Rating3'
import Rating4 from '../Components/svgs/Rating4'

import Footer from '../Components/Footer'
import RandomMovie from '../Components/RandomMovie'
import Popular from '../Components/Popular'
import Community from '../Components/community'

function Home() {
  return (
    <div className='w-full ' style={{ overflowX: 'hidden' }}>
      <div className="header w-full">
        <Navbar />
      </div>
      <div  style={{ overflowX: 'hidden' }}>
      <div className="Hero bg-[#111111]  ">
       <div className='flex justify-center p-5'>
       <div className="heading h-36 sm:h-20   text-white">
        <h2 className='text-3xl font-extrabold  md:text-5xl'>Connecting movie lovers accross the globe</h2>
        <p className='text-center mt-3'>A Place to Talk Movies, Share Opinions, and Make Connections!</p>
        </div>
       </div>
       <h2 className=' text-center  sm:text-3xl text-2xl underline text-yellow-300 pt-4 font-extrabold'>Features</h2>
        <div className="hero grid   gap-4 sm:grid-cols-3 px-3 text-white sm:ml-4">
        <div className="hero min-h-48  ">
          <Rating4/>
          <p className='p-2 text-md font-medium sm:text-xl sm:font-semibold '>Rating</p>
        </div>
        <div className="hero min-h-48  ">
        <Rating3/>
        <p  className='p-2 text-md font-medium sm:text-xl sm:font-semibold '>Like/Dislikes</p>
        </div>
        <div className="hero min-h-48  ">
        <Rating2/>
        <p  className='p-2 text-md font-medium sm:text-xl sm:font-semibold '>Discussion</p>
        </div>
        </div>
      </div>
      <div className='Movie-of-day pt-16 bg-[#111111] w-full'>
        <h2 className='text-white text-4xl font-semibold text-center pb-5'>Movie Of The Day</h2>
        <div className=''>
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
        <p className='text-lg pl-3 text-white'>"Welcome to MovieMeter, the ultimate community for movie lovers! We’re a passionate group of film enthusiasts dedicated to exploring and discussing everything cinema has to offer. Whether you're into classic films, modern blockbusters, or hidden indie gems, our platform is designed to bring movie buffs together to share opinions, reviews, and recommendations.

Our mission is to create a space where you can connect with fellow movie lovers, discover new films, and engage in insightful discussions. Join us in celebrating the art of storytelling through film —<span className='text-yellow-500'> because every movie is better when you experience it with others!</span>"</p>
      </div>
      <div className="Community  pt-9  bg-[#111111] w-full">
        <h2 className='text-white text-4xl font-semibold text-center'>What our Community Says</h2>
        <div className='grid sm:grid-cols-3 gap-4'>
       <Community/>
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