import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout1 from '../Components/svgs/Logout1';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }).catch((error) => {
      console.error('Error logging out:', error);
      navigate('/login');
    });
  }, [navigate]);

  return (
    <div className='h-screen bg-[#4432dc]'>
      <h2 className='font-bold text-3xl pt-5 text-white text-center'>You're Successfully Logged out</h2>
      <Logout1 />
    </div>
  );
}

export default Logout;