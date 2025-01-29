import axios from 'axios';
import React,{useRef, useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import{ useGSAP} from '@gsap/react'
import gsap from 'gsap';
function AddReview(props) {
    const { movieId } = useParams();
const [comment, setcomment] = useState('')
const [rating, setrating] = useState('')
    const submitHandler =async(e)=>{
        e.preventDefault();
        const FormData ={
            comment:comment,
            rating:rating
        }
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/review/${movieId}/postreviews`, FormData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error('Error posting review:', err);
        }
    }

    const toggleButton =()=>{
      props.setAddReview(!props.addReview)
    }
  return (

    <div className='w-full fixed' >
      <form action=""
      onSubmit={(e)=>{
        submitHandler(e);
      }}
      >
      <input type="text " 
          value={comment}
          onChange={(e)=>{
            setcomment(e.target.value)
          }}
      className='w-80 text-black text-center mt-4 h-16 rounded-lg pl-2  border-2 ml-4'
      placeholder='add review'
      
      />
      <div className="select text-center flex gap-2  h-16 w-48 mt-2   justify-center items-center">
       <div className='w-24'>
       <h1 className='text-xl font-semibold text-black'>Rating</h1>
       </div>
      <div className='w-24  h-full text-center pt-5 text-xl'>
      <select
      required
      value={rating}
      onChange={(e)=>{
        setrating(e.target.value)
      }}
      className=' h-5 w-24 rounded-lg bg-black  border text-sm placeholder:text-base'>
        <option value='' disabled>Select Option</option>
        <option value='1' >1</option>
        <option value='2' >2</option>
        <option value='3'>3</option>
        <option value='3'>4</option>
        <option value='3'>5</option>
      </select>
      </div>
      </div>
     
     <button 
     onClick={toggleButton}
      className=' bg-[#23c65d] w-1/2 h-9 ml-12 mt-4 font-semibold cursor-pointer rounded-lg text-center '>Add Review
      </button>
      </form>

    </div>
  )
}

export default AddReview