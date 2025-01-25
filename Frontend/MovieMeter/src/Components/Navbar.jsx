import React,{useState,useRef} from 'react'
// import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';
function Navbar() {

  return (
    <nav className='bg-[#4432dc] h-16 flex border-2 border-pink-400 rounded-lg '>
        <div className="right w-1/2  h-full">
            <Link to='/'><h2 className='font-bold text-3xl text-center text-yellow-300 pt-3'>MovieMeter</h2></Link>
        </div>

        <div className="left w-1/2 h-full  flex items-center justify-end ">
      <div  className='text-4xl mr-3 flex gap-3 rounded-lg text-white'>
        {/* <GiHamburgerMenu /> */}
        <Link to='/MyAccount'><FaRegUser className='cursor-pointer' /></Link>
      <Hamburger  />
      </div>
        </div>
    </nav>
  )
}

export default Navbar