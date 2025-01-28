import React,{useState,useRef} from 'react'
// import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';
function Navbar() {

  return (
    <nav className='bg-[#4432dc] h-16  border-2 border-pink-400 rounded-lg w-full 'style={{ overflowX: 'hidden' }}>
       
       <div className='flex justify-evenly gap-10 pt-3 items-center'>
        <div className="right   h-full">
            <Link to='/'><h2 className='font-bold text-3xl text-center text-yellow-300 '>MovieMeter</h2></Link>
        </div>

        <div className="left text-4xl gap-3    flex items-center justify-around ">
      <div  className='  flex  rounded-lg text-white'>
        {/* <GiHamburgerMenu /> */}
        <Link to='/MyAccount'><FaRegUser className='cursor-pointer' /></Link>
        </div>
        <div className='' >
        <Hamburger  />
        </div>
      
      
        </div>
        </div>
    </nav>
  )
}

export default Navbar