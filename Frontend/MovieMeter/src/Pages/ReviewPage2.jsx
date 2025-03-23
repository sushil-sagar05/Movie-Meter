import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'
import Footer from '../Components/Footer'
import StarRating from '../Components/Rating'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CardSkelton from '../Components/Skelton/CardSkelton'
import { toast } from 'react-toastify'
import {MoonLoader} from 'react-spinners'
function ReviewPage2() {
    const{movieId}=useParams()
    const [movie, setmovie] = useState(null)
    const [comment, setcomment] = useState('')
    const [rating, setrating] = useState('')
    const [loading, setloading] = useState(true)
    const [spinloader,setspinloader] = useState(false)
    
    useEffect(() => {
       const fetchData = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/movie/${movieId}`)
            setmovie(response.data)
          } catch (error) {
            
          }finally{
            setloading(false)
          }
       }
    
        fetchData();
      }, [movieId]);
      const submitHandler =async(e)=>{
        e.preventDefault();
        setspinloader(true)
        const FormData ={
            comment:comment,
            rating:rating
        }
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/review/${movieId}/postreviews`, FormData, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
           
          });
          if(response.status===201){
            toast.success("Congratulations! Review added")
          }
        } catch (err) {
          const errorData=err.response.data
                  const validationError=errorData.error
                  if(validationError){
                   const reviewError = validationError.find(err=>err.path==="comment");
                   if(reviewError){
                     toast.error(reviewError.msg)
                   }
                   const ratingError = validationError.find(err=>err.path==="rating");
                   if(ratingError){
                     toast.error(ratingError.msg)
                   }
                  }else{
                   toast.error("Something went wrong")
                  }
        } 
        setspinloader(false)
        setcomment(' ')
        setrating(' ')
    }
   
    const handleRatingChange = (newRating) => {
      setrating(newRating); 
    };
    // const notify =()=>{
    //   toast.success('Review Added')
    // }
  return (
    <>
    <div className='bg-[#111111]  w-full'style={{ overflowX: 'hidden' }}>
        <Navbar/>
        {
          loading?
          <>
           {Array.from({ length: 1 }).map((_, i) => (
      <CardSkelton/>
    ))}
          </>
          
          :
          
          <div className='justify-center items-center gap-4 min-h-[65vh] max-w-[100vw]  m-3 grid grid-cols-12  text-white'>
          <div className=' sm:col-span-5 rounded-lg sm:p-10'>
          <div className='border shadow-md mt-5  rounded-lg bg-black w-80 m-5 sm:m-10'>
            <div  className="cover h-64 flex justify-center items-center rounded-lg ">
              <div className="image h-full">
              <img className='h-64 w-80 rounded-lg' src={movie.poster} 
              
               />
              </div>
            </div>
            <hr className='' />
            <div className="content rounded-lg h-32 bg-[#141b23] text-white">
              <div className="name  text-sm">
                <h2 className='ml-2'>Title: {movie.title}</h2>
                <h2 className='ml-2'>Director: {movie.director}</h2>
                <div>
                  <h2 className='ml-2'>Cast: {movie.cast.slice(0,3).join(", ")}</h2>
                  <h2 className='ml-2 mr-2'>Release date:{movie.year}</h2>
                  <p className='ml-2'>Rating: {movie.Avgrating}</p>
                </div>
              
              </div>
            </div>
          </div>
          </div>
          <div className=' sm:col-span-6 border-2 min-h-[65vh] rounded-lg m-2 hidden sm:block '>
            <h2 className='text-center sm:text-3xl sm:font-semibold sm:p-4 bg-[#141b23]'>Add Your Review</h2>
            <hr />
            <div className="form min-h-[50vh]  m-2">
            <form action=""
      onSubmit={(e)=>{
        submitHandler(e);
      }}
      >
                <input type="text"
                  value={comment}
                  onChange={(e)=>{
                    setcomment(e.target.value)
                  }}
                className='w-full text-black p-2 min-h-[30vh] rounded-lg border outline-orange-500 '
                placeholder=' Enter your Review here ...'
                />
                 <div className="rating    flex ">
              <h2 className=' text-2xl font-semibold m-2'>Rate</h2>

<div

class="flex items-center ">
 <StarRating totalStars={5} onRatingChange={handleRatingChange}/>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          readOnly
          className="ml-1 text-2xl font-semibold w-0 bg-[#141b23] text-red-500 "
        />
      </div>
        </div>
        <button 
     type='submit'
     disabled={spinloader}
     className=' bg-[#23c65d]  w-48 h-9 ml-4 mt-4 font-semibold cursor-pointer rounded-lg text-center '>{spinloader?<><MoonLoader size={18} color='white' /></>:"Add Review"}
     </button>
     
              </form>

            </div>
          </div>
          </div>
          
        }
        <div className="flex justify-center text-center sm:hidden">
       <div className=''>
        <h2 className='text-2xl font-semibold text-yellow-500 '>Review</h2>
        <div >
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
      <div className="rating text-white   flex ">
<h2>Rate</h2>

<div

class="flex items-center ">
 <StarRating totalStars={5} onRatingChange={handleRatingChange}/>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          readOnly
          className="ml-1 text-2xl font-semibold w-0 bg-[#141b23] text-white "
        />
   

</div>
<button 
type='submit'
disabled={spinloader}
     className=' bg-[#23c65d] mb-5 w-36 h-9 ml-4 mt-4 font-semibold cursor-pointer rounded-lg text-center '>{spinloader?<><MoonLoader size={18} color='white' /></>:"Add Review"}
     </button>
     
      </div>
      </form>
      </div>
      
      </div>
      
    </div>
    </div>
    <div className='fixed  w-screen bg-black flex justify-center items-center '>
      <div className=''>
      <Footer/>
      </div>
   
   </div>
  
      

    </>
  )
}

export default ReviewPage2

