import React from 'react'
import Navbar from '../Components/Navbar'
import { FaRegUser } from "react-icons/fa6";
import Footer from '../Components/Footer';
function Account() {
  return (
    <div className='bg-[#111111] h-screen w-full'>
        <Navbar/>
        <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Contributions</h2>
        <hr />
        <div className="card  m-16 border-2 rounded-lg h-64 ">
            <div  className='flex m-3 '>
            <div className="icon ">
             <FaRegUser className=' border-2 text-7xl rounded-full text-white ' />
            </div>
            <div className="content text-white">
                <div className="name pt-4 font-semibold pl-3 text-2xl">Sushil Sagar</div>
            </div>
            
            </div>
            <hr />
            <div className="content m-10 text-2xl font-semibold   text-white">
                <h1>Review : 100+</h1>
                <h1>Rating : 100+</h1>
            </div>
        </div>
        <div className="footer absolute bottom-0 w-full bg-white ">
            <Footer/>
        </div>
    </div>
  )
}

export default Account