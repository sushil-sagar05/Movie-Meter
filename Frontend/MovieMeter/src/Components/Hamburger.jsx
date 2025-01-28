import React, { useState, useRef, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from "react-icons/rx";
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Hamburger() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const hamburgerRef = useRef(null);
  useEffect(() => {
    if (hamburgerOpen) {
      gsap.to(hamburgerRef.current, {
        duration: 0.5,
        opacity: 1,
        x:0,
        // y:0,
        ease: 'power3.out'
      });
    } else {
      gsap.to(hamburgerRef.current, {
        duration: 0.5,
        opacity: 0,
        x: 200,
        ease: 'power3.in'
      });
    }
  }, [hamburgerOpen]);

  const toggleButton = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
 const notify = ()=>{
  toast.success('User Logged Out')
 }
  return (
    <div>
      <button   onClick={toggleButton}>
        {hamburgerOpen? <RxCross1/>:<GiHamburgerMenu />}
        </button>
      <div ref={hamburgerRef} 
      className={`bg-white text-black rounded-lg h-36 text-xl text-center w-24 cursor-pointer text-black${hamburgerOpen ? 'opacity-100' : 'opacity-0'}`}
      style={{ opacity: 0, position: 'absolute', top: '65px', right:'0' }}>
        {/* Menu content */}
        <ul className='border rounded-lg '>
         <Link to='/movies'><li className=''>Movies</li></Link> 
          <hr />
          
         <Link to='/review'><li>Review</li></Link> 
          <hr />
          <Link to='/about'><li>About</li></Link>
          <hr />
         <Link to='/MyAccount'><li>Account</li></Link> 
          <hr />
          <Link
          onClick={notify}
          to='/user/logout'><li>Logout</li></Link>
          <hr />
        </ul>
      </div>
    </div>
  );
}

export default Hamburger;