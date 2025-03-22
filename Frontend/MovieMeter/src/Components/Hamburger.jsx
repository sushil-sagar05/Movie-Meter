import React, { useState, useRef, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from "react-icons/rx";
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Hamburger() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const token = localStorage.getItem('token');

 
  useEffect(() => {
    if (hamburgerOpen) {
      gsap.to(hamburgerRef.current, {
        duration: 0.3,
        opacity: 1,
        x: 0,
        ease: 'power3.out',
        display: "block"
      });
      document.body.style.overflow = 'hidden'; 
    } else {
      gsap.to(hamburgerRef.current, {
        duration: 0.3,
        opacity: 0,
        x: 200,
        ease: 'power3.in',
        onComplete: () => {
          hamburgerRef.current.style.display = "none";
        }
      });
      document.body.style.overflow = 'auto'; 
    }
  }, [hamburgerOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setHamburgerOpen(false);
      }
    }

    if (hamburgerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hamburgerOpen]);

  const notify = () => {
    toast.success('User Logged Out');
  };

  return (
    <div className="relative">
      <button className="text-white z-50" onClick={() => setHamburgerOpen(!hamburgerOpen)}>
        {hamburgerOpen ? <RxCross1 /> : <GiHamburgerMenu />}
      </button>

      {/* Hamburger Menu */}
      <div 
        ref={hamburgerRef} 
        className="fixed top-16 right-0 bg-white text-black rounded-lg h-54 text-xl text-center w-40 shadow-lg border z-50"
        style={{ opacity: 0, display: "none", position: 'absolute' }}
      >
        <ul className="border rounded-lg">
  <Link to='/movies'><li className='py-2 hover:bg-gray-200'>Movies</li></Link>
  <hr />
  <Link to='/review'><li className='py-2 hover:bg-gray-200'>Review</li></Link>
  <hr />
  <Link to='/about'><li className='py-2 hover:bg-gray-200'>About</li></Link>
  <hr />
  <Link to='/MyAccount'><li className='py-2 hover:bg-gray-200'>Account</li></Link>
  <hr />
  {
    token ?  
    <Link onClick={notify} to='/user/logout'>
      <li className='py-2 hover:bg-gray-200'>Logout</li>
    </Link>
    : <Link to='/login'>
        <li className='py-2 hover:bg-gray-200'>Login</li>
      </Link>
  }
  <hr />
</ul>

      </div>
    </div>
  );
}

export default Hamburger;
