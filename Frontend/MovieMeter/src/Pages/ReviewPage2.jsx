import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'
import Footer from '../Components/Footer'
import StarRating from '../Components/Rating'
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
          // console.log(FormData)
        } catch (err) {
          console.error('Error posting review:', err);
        }
        setcomment('')
        setrating('')
    }
    const handleRatingChange = (newRating) => {
      setrating(newRating); // Update the rating state when user clicks on a star
    };
  return (
    <>
    <div className='bg-[#111111]'>
        <Navbar/>
        <div className='justify-center items-center flex'>
        <div className='border-2   rounded-lg'>
          <div  className="cover flex justify-center items-center rounded-lg ">
            <div className="image">
            <img className='h-72 w-80 rounded-lg' src={movie.poster} 
            
             />
            </div>
          </div>
          <hr className='mt-2' />
          <div className="content rounded-lg h-28 bg-[#141b23] text-white">
            <div className="name  text-sm">
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
        </div>
        <h2 className='text-2xl font-semibold text-yellow-500 '>Review</h2>
        
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
      <div className="rating text-white  flex ">
<h2>Rate</h2>

<div

class="flex items-center">
 <StarRating totalStars={5} onRatingChange={handleRatingChange}/>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          readOnly
          className="ml-1 text-2xl font-semibold w-4 bg-black text-white "
        />
   

</div>
<button 
     
     className=' bg-[#23c65d] mb-5 w-36 h-9 ml-4 mt-4 font-semibold cursor-pointer rounded-lg text-center '>Add Review
     </button>
     
      </div>
      </form>
    </div>
   <div className='fixed bottom-0 ml-20 '>
   <Footer/>
   </div>
      

    </>
  )
}

export default ReviewPage2

