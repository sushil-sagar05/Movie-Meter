import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function Movies() {
  return (
    <div className='bg-[#111111]  w-full'>
        <Navbar/>
 <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Movies Section</h2>
    <div className="categoryMenu flex gap-2">
        <input type="search" 
        placeholder='Search Movies with Name'
        className='w-60 h-10 rounded-lg ml-5 pl-3  border-2 border-r-0 border-pink-700'
        />
    <button className='bg-yellow-500 w-24 rounded-lg border-2 border-l-0  font-semibold hover:bg-yellow-400'>Search</button>
    </div>
    <div className="Movies gap-y-3">
    
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
              <div className='z-50 absolute flex justify-center items-center text-center'><Footer/></div>
          </div>
          
        </div>
      
    </div>
    </div>
  )
}

export default Movies