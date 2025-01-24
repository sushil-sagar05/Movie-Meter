import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'
function ReviewPage2() {
    const{movieId}=useParams()
    const [movie, setmovie] = useState([])
    const [comment, setcomment] = useState('')
    const [rating, setrating] = useState('')
    const [loading, setloading] = useState(true)
    
    useEffect(() => {
       const fetchData = async()=>{
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/movie/${movieId}`)
            // console.log(data)
            setmovie(data)
          } catch (error) {
            
          }
       }
    
        fetchData();
      }, [movieId]);
      const submitHandler =async(e)=>{
        // e.preventDefault();
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
  return (
    <div>
        <Navbar/>
        <div className='border-2 rounded-lg'>
          <div  className="cover  rounded-lg ">
            <div className="image">
            <img className='h-72 w-full rounded-lg' src={movie.poster} 
            
             />
            </div>
           <div className="love absolute text-4xl right-0">
            <button className='cursor-pointer pt-2'>💓</button>
           </div>
            
          </div>
          <hr className='mt-2' />
          <div className="content rounded-lg h-20 bg-white">
            <div className="name text-black text-sm">
              <span className='ml-1'>{movie.title}</span>
              <span className='ml-2'>Director: {movie.director}</span>
              <div>
                <span className='ml-2'>Cast: {movie.cast}</span>
                <span className='ml-2 mr-2'>Release date:{movie.year}</span>
                <p className='ml-6'>Review: 5★★★★★</p>
              </div>
            
            </div>
          </div>
        </div>
        <h2 className='text-2xl font-semibold'>Review</h2>
        
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
      className=' h-5 w-24 rounded-lg  border text-sm placeholder:text-base'>
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
    //  onClick={toggleButton}
      className=' bg-[#23c65d] w-1/2 h-7 ml-12  font-semibold cursor-pointer rounded-lg text-center '>Add Review
      </button>
      </form>
       


    </div>
  )
}

export default ReviewPage2