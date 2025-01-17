import axios from 'axios';
import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
function AddReview(props) {
    const { movieId } = useParams();
const [comment, setcomment] = useState('')
const [rating, setrating] = useState('')
    // console.log(props)
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
        //   console.log(response);
        } catch (err) {
          console.error('Error posting review:', err);
        }
    }
  return (

    <div className='w-full fixed'>
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
      className='w-80 text-black text-center mt-4 h-10 rounded-lg pl-2  border-2 ml-4'
      placeholder='add review'
      
      />
      <div className="select text-center flex gap-2  justify-center items-center">
        <h1 className='text-xl font-semibold text-black'>Rating</h1>
      <select
      required
      value={rating}
      onChange={(e)=>{
        setrating(e.target.value)
      }}
      className='bg-black h-5 w-24 rounded-lg  border text-sm placeholder:text-base'>
        <option value='' disabled>Select Option</option>
        <option value='1' >1</option>
        <option value='2' >2</option>
        <option value='3'>3</option>
        <option value='3'>4</option>
        <option value='3'>5</option>
      </select>
      </div>
     
     <button onClick={()=>props.setaddreview(true)}
      className=' bg-yellow-500 w-1/2 h-9 ml-12 mt-4 font-semibold cursor-pointer rounded-lg text-center '>Add Review
      </button>
      </form>

    </div>
  )
}

export default AddReview