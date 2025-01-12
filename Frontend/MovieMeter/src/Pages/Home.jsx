import React,{useState,useRef} from 'react'
import Navbar from '../Components/Navbar'
import Rating1 from '../Components/svgs/Rating1'
import Rating2 from '../Components/svgs/Rating2'
import Rating3 from '../Components/svgs/Rating3'
import Rating4 from '../Components/svgs/Rating4'
import { FaRegUser } from "react-icons/fa6";
import Footer from '../Components/Footer'
function Home() {

  return (
    <>
    <div className='h-screen bg-[#282828]'>
      <div  >
      <Navbar/>
      <div className="hero h-screen bg-[#111111]">
    <h2 className='text-5xl text-center pt-5 text-white font-semibold'>Connecting Movie Lovers Accross the World...</h2>
   <hr className='mt-6' />
   <h2 className='font-bold bg-[#0d1017] flex gap-3 py-6 pl-10  text-white text-2xl'>
   <h4 >Review</h4>
    <h4 className='text-yellow-500'>share</h4>
    <h4>Recommed</h4>
    </h2> 
    <hr />
 
    <div className="featres  h-screen bg-[#111111] mt-5">
        <h3 className='text-white text-center text-5xl font-semibold '>Features</h3>
        <div className='text-white text-center  mt-6'>
          <div className='1 flex justify-center items-center  h-48  ml-20'>
          <h2 className='text-xl font-semibold'>Featured Review</h2>
                  <Rating4 />
              </div>

          <div className='2. flex justify-center items-center h-32 '>
                  <Rating3 />
                  <h2 className='text-xl font-semibold pr-32 text-yellow-500 '>Latest Reviews</h2>
              </div>
          <div className='3. flex justify-center items-center h-32  ml-24'>
          <h2 className='text-2xl pr-4'>curated List   </h2>
                  <Rating2 />
                  

              </div>
          <div className='flex justify-center items-center h-32   '>
          
                  <Rating1 />
                  
              </div>
             <h2 className='text-xs'>Just Sit and Watch Best Movies with PopCorn</h2>
        </div>
      </div>
      <div className='Movie-of-day h-screen pt-16 bg-[#111111]'>
        <h2 className='text-white text-4xl font-semibold text-center pb-5'>Movie Of The Day</h2>
        <hr className='pt-6' />
        <div className='bg-[#141b23]  rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-72 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://www.itl.cat/pngfile/big/61-611138_bahubali-movie.jpg" alt="" />
          </div>
          <div className="content">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              <span>Review:5★★★★★</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-3'>
              <div className="Review bg-yellow-500   h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
              <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>Watch Now</button></div>
              </div>
             <div><h4 className='text-sm'>Get Ai Powered StoryLine of this Movie?</h4><button className='bg-white w-1/2 rounded-lg h-8 font-semibold text-black'>Click Here</button></div>
              </div>
          </div>
        </div>
      </div>
      <div className="Latest  bg-[#111111]"> 
      <h2 className='text-white text-4xl font-semibold text-center pb-5'>Latest In's</h2>
      <div className='bg-[#141b23]  rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-72 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://ccdiscovery.com/wp-content/uploads/2019/11/Laal-Singh-Chaddha-New-Poster.jpg" alt="" />
          </div>
          <div className="content">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              <span>Review:5★★★★★</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-3'>
              <div className="Review bg-yellow-500   h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
              <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>Watch Now</button></div>
              </div>
             <div><h4 className='text-sm'>Get Ai Powered StoryLine of this Movie?</h4><button className='bg-white w-1/2 rounded-lg h-8 font-semibold text-black'>Click Here</button></div>
              </div>
          </div>
        </div>
        <div className='bg-[#141b23]  rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-72 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://www.itl.cat/pngfile/big/61-611138_bahubali-movie.jpg" alt="" />
          </div>
          <div className="content">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              <span>Review:5★★★★★</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-3'>
              <div className="Review bg-yellow-500   h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
              <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>Watch Now</button></div>
              </div>
             <div><h4 className='text-sm'>Get Ai Powered StoryLine of this Movie?</h4><button className='bg-white w-1/2 rounded-lg h-8 font-semibold text-black'>Click Here</button></div>
              </div>
          </div>
        </div>
        <div className='bg-[#141b23]  rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-72 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://assets.gadgets360cdn.com/pricee/assets/product/202205/Kabhi-Khushi-Kabhie-Gham-poster_1652288523.jpg" alt="" />
          </div>
          <div className="content">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              <span>Review:5★★★★★</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-3'>
              <div className="Review bg-yellow-500   h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
              <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>Watch Now</button></div>
              </div>
             <div><h4 className='text-sm'>Get Ai Powered StoryLine of this Movie?</h4><button className='bg-white w-1/2 rounded-lg h-8 font-semibold text-black'>Click Here</button></div>
              </div>
          </div>
        </div>
      </div>
      <div className="About-Us pt-9 bg-[#111111]">
      <h2 className=' text-4xl font-serif text-center pb-2 text-yellow-500'>MovieMeter</h2>
      <h2 className='text-white text-4xl font-semibold text-center pb-5'>About Us</h2>
        <p className='text-lg pl-3 text-white'>"We are passionate about connecting movie lovers with the best films and reviews. Our mission is to provide an engaging platform where you can discover new movies, read insightful reviews, and share your own thoughts with a community of fellow film enthusiasts."</p>
      </div>
      <div className="Community h-screen pt-9 bg-[#111111]">
      <h2 className='text-white text-4xl font-semibold text-center pb-5'>What our Community Says</h2>
      <div className=' h-40 rounded-lg shadow-md w-80 bg-white mt-8 ml-6'>
        <div className="content h-24  flex pt-5 pl-3">
          <div className="user h-1/2  text-7xl "><FaRegUser /></div>
          <div className="name h-1/2  text-2xl ">
          <div className="namee ">Sushil Sagar</div>
          <div className="pesa">Blogger</div>
          </div>
          
        </div>
        <div className="message pl-3">
          <h2>"Awesome List of Movies"</h2>
          ⭐⭐⭐⭐⭐
        </div>
      </div>
      <div className=' h-40 rounded-lg shadow-md w-80 bg-white mt-8 ml-6'>
        <div className="content h-24  flex pt-5 pl-3">
          <div className="user h-1/2  text-7xl "><FaRegUser /></div>
          <div className="name h-1/2  text-2xl ">
          <div className="namee ">Sushil Sagar</div>
          <div className="pesa">Blogger</div>
          </div>
          
        </div>
        <div className="message pl-3">
          <h2>"Awesome List of Movies"</h2>
          ⭐⭐⭐⭐⭐
        </div>
      </div>
     
      </div>
      <Footer/>
      </div>
     
      </div>
      
    </div>
    
   </>
  )
}

export default Home