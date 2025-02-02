import React,{useState,useRef} from 'react'
// import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import Hamburger from './Hamburger';
import { Link,NavLink } from 'react-router-dom';
function Navbar() {

  return (
    <nav className='bg-[#4432dc] h-16  border-2 border-pink-400 rounded-lg w-full '>
       
       <div className='flex justify-around md:flex-row  pt-3 items-center'>
        <div className="right w-1/2  h-full">
            <Link to='/'><h2 className='font-bold text-3xl text-center text-yellow-300 '>MovieMeter</h2></Link>
        </div>

        <div className="left text-4xl justify-around gap-5 flex items-center ">
      <div  className='    rounded-lg  text-white'>
        
        <Link to='/MyAccount'><FaRegUser className='cursor-pointer' /></Link>
        </div>
        <div className='lg:hidden' >
        <Hamburger  />
        </div>
        <div className='hidden md:flex gap-4 text-white font-semibold'>
        <NavLink to='/movies'
        className={({isActive}) => `${isActive ? "text-yellow-400 " : "text-white"} `}
        >Movies</NavLink>
        <NavLink to='/review'
         className={({isActive}) => `${isActive ? "text-yellow-400" : "text-white"}`}
         >Review</NavLink>
        <NavLink to='/about'
         className={({isActive}) => `${isActive ? "text-yellow-400" : "text-white"} `}
         >About</NavLink>
        <Link to='/user/logout'
        
        >Logout</Link>
        </div>
      
        </div>
        </div>
    </nav>
  )
}

export default Navbar