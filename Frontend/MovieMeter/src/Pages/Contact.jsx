import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function Contact() {
  return (
    <div className='bg-[#111111]  w-full'>
        <Navbar/>
        <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Review</h2>
        <h2 className='text-2xl  text-yellow-500 font-semibold text-center pb-5 pt-5 '>Give Back To Community . Review and Rate Movies</h2>
        <h2 className='text-sm text-white font-semibold text-center pb-5 pt-1'> So Other's Don't Has to brainstorm Here and there..</h2>
       <hr />
       <div>
       <div className="card ">
        <div className='bg-[#141b23]   rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-64 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://ccdiscovery.com/wp-content/uploads/2019/11/Laal-Singh-Chaddha-New-Poster.jpg" alt="" />
          </div>
          <div className="content h-36 pt-3">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-5'>
              <div className="Review bg-yellow-500   h-9 font-semibold  pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
             
              </div>
             
              </div>
          </div>
        </div>
        </div>
        <div className="card ">
        <div className='bg-[#141b23]   rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-64 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://ccdiscovery.com/wp-content/uploads/2019/11/Laal-Singh-Chaddha-New-Poster.jpg" alt="" />
          </div>
          <div className="content h-36 pt-3">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-5'>
              <div className="Review bg-yellow-500   h-9 font-semibold  pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
             
              </div>
             
              </div>
          </div>
        </div>
        </div>
        <div className="card ">
        <div className='bg-[#141b23]   rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-64 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://ccdiscovery.com/wp-content/uploads/2019/11/Laal-Singh-Chaddha-New-Poster.jpg" alt="" />
          </div>
          <div className="content h-36 pt-3">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-5'>
              <div className="Review bg-yellow-500   h-9 font-semibold  pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
             
              </div>
             
              </div>
          </div>
        </div>
        </div>
        <div className="card ">
        <div className='bg-[#141b23]   rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-64 w-80  ">
            <img className='h-full w-full rounded-lg' src="https://ccdiscovery.com/wp-content/uploads/2019/11/Laal-Singh-Chaddha-New-Poster.jpg" alt="" />
          </div>
          <div className="content h-36 pt-3">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Bahubali-the-begining</span>
              <span className='ml-2'>Director: Sagar </span>
              <div>
              <span className='ml-2'>Cast: Sagar, Swati</span>
              <span className='ml-2'>Release date: 20/20/2024</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-5'>
              <div className="Review bg-yellow-500   h-9 font-semibold  pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
             
              </div>
             
              </div>
          </div>
        </div>
        </div>
       </div>
        <div className="footer bg-white"><Footer/></div>

    </div>
  )
}

export default Contact