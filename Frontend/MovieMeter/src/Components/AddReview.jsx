import axios from 'axios';
import React,{useRef, useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import socket from '../socket';
import StarRating from './Rating';
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
            withCredentials:true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response)
          if(response.status===201){
            socket.emit('newReview', {
              movieId, 
              comment: response.data.comment, 
              rating: response.data.rating,
              createdAt: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.error('Error posting review:', err);
        }
        setcomment(' ')
        setrating(' ')
    }
    const handleRatingChange = (newRating) => {
      setrating(newRating); 
    };
  return (
    <form action=""
    onSubmit={(e)=>{
      submitHandler(e);
    }}>
  <div className=' w-full sm:h-[15vh] m-2 p-2 '>
    <div className="content sm:flex ">
      <div className="input w-full h-[13vh] border-2 shadow-md border-black p-1 rounded-lg ">
    <input type="text"
     value={comment}
     onChange={(e)=>{
       setcomment(e.target.value)
     }}
    className='p-2 w-full h-full rounded-lg'
    placeholder='Enter Your Review Here ...'
    />
   </div>
   <div className="submit pt-5 ">
   <StarRating totalStars={5} onRatingChange={handleRatingChange}/>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          readOnly
          className="ml-1 text-2xl font-semibold w-0   "
        />
        <button className='w-32 h-10 rounded-lg font-semibold text-white shadow-md mt-2 bg-green-500'>submit</button>
   </div>
    </div>
  </div>
  </form>
  )
}

export default AddReview