import React, { useEffect,useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DiscussionCard from '../Components/DiscussionCard';
import DiscussionStart from '../Components/DiscussionStart';
import gsap from 'gsap';
const socket = io(import.meta.env.VITE_BASE_URL);

function Discussion() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const { movieId } = useParams();
    const [panelOpen, setpanelOpen] = useState(true)
    const PanelRef = useRef(null)
    const messageEndRef = useRef(null)
    useEffect(() => {
      if (PanelRef.current) {
        if (panelOpen) {
          gsap.to(PanelRef.current, {
            y: -600,
            duration: 0.5,
            ease: 'power3.out',
          });
        } else {
          gsap.to(PanelRef.current, {
            y: 600,
            duration: 0.5,
            ease: 'power3.in',
          });
        }
      }
    }, [panelOpen]);
    useEffect(() => {
      const roomName = `${movieId}`;
      socket.emit('joinRoom', roomName);
      socket.on('chat', (payload) => {
        setChat((prevChat) => {
          const updatedChat = [...prevChat, payload];
          return updatedChat;
        });
      });
    
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/messages`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setChat(response.data); // Set initial messages
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
    
      fetchMessages();
    
      return () => {
        socket.emit('leaveRoom', roomName); // Ensure you leave the room
        socket.off('chat'); // Clean up the 'chat' listener to avoid duplication
      };
    }, [movieId]);
    
    
    
    
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/messages`, { message }, {
        withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        socket.emit('chat', { roomId: movieId, message: response.data });
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  useEffect(()=>{
    messageEndRef.current.scrollIntoView({behavior:"smooth"})
  },[chat])
 
  return (
    <div className='bg-white h-screen fixed w-full'>
      <Navbar />
      <div className='h-28 '>
      <h2 className='text-black text-4xl font-semibold text-center pb-3 pt-5'>Discussion</h2>
      
      <h3 className='bg-red-500'>Maintain healthy chat here :D</h3>
      <hr />
      </div>
      <div className='h-96  overflow-y-scroll'>
      <div className='messages  '>
        {chat.map((msg, index) => (
          <div key={msg._id} className='h-full'>
            <DiscussionCard key={msg._id} message={msg.message} fullname={msg.fullname} />
             </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      </div>
      <div className=' h-16 flex text-center'>
      <div className='w-full pt-3 '>
        <form onSubmit={handleSendMessage}>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter Your message'
            className='w-72 h-8 pl-2 bg-[#ffffff] rounded-lg ml-3 border-2'
          />
          <button className='bg-red-500 ml-1 h-8 w-16 font-semibold rounded-lg'>Send</button>
        </form>
      </div>
      </div>
      <div ref={PanelRef}>
        <DiscussionStart setpanelOpen={setpanelOpen} panelOpen={panelOpen} />
      </div>
    </div>
  );
}

export default Discussion;