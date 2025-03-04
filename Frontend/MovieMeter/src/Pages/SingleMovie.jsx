import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Singlereview from '../Components/Singlereview';
import gsap from 'gsap';
import AddReview from '../Components/AddReview';
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CardSkelton from '../Components/Skelton/CardSkelton'
import { toast } from 'react-toastify';
function SingleMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addReview, setAddReview] = useState(false);
  const addReviewRef = useRef(null);
  const navigate = useNavigate();
 

const [favorite, setfavorite] = useState(false)
const [like, setlike] = useState(false)
const [dislike, setdislike] = useState(false)
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/movie/${movieId}`);
       
        setMovie(response.data);
      } catch (err) {
        setError('Failed to fetch movie details.');
        console.error('Error fetching movie:', err); // Log the error for debugging
      }
    };

    const fetchData2 = async () => {
      try {
        const token = localStorage.getItem('token')
       
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/${movieId}/getreviews`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReview(response.data);
      } catch (err) {
        console.log(err)
        setError('You must be logged in to view this page', err);
        toast.error("You must be logged in to view this page")
        navigate('/login');
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([fetchData1(), fetchData2()]);
      } catch (err) {
        setError('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    if (addReviewRef.current) {
      if (addReview) {
        gsap.to(addReviewRef.current, {
          y: -250,
          duration: 0.5,
          ease: 'power3.out',
        });
      } else {
        gsap.to(addReviewRef.current, {
          y: 250,
          duration: 0.5,
          ease: 'power3.in',
        });
      }
    }
  }, [addReview]);

  if (error) {
    return <div>Error: {error}</div>;
  }



const submitHandler1=async(e)=>{
  e.preventDefault()
try {
  
  if(!favorite) {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/user/favourites/${movieId}`,{},  {
     withCredentials:true
    });
 
    setfavorite(true);
    toast.success('Added To favorites')
  }
  else {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/favourites/${movieId}`, {
    withCredentials:true
    });
    setfavorite(false)
    toast.success("Remove")
  }
} catch (error) {
  console.error('Error toggling favorite:', error);
}

}
const Like = async (e)=>{
  e.preventDefault()
try {
 if(!like){
  await axios.post(`${import.meta.env.VITE_BASE_URL}/user/likes/${movieId}`,{},{
    withCredentials:true
  });
  setlike(true);
  toast.success("Liked")
 }
} catch (error) {
  console.error('Error toggling like:', error);
}
}

const Dislike = async (e)=>{
  e.preventDefault();
  try {
    if(!dislike){
      await axios.post(`${import.meta.env.VITE_BASE_URL}/user/dislikes/${movieId}`,{},{
        withCredentials:true
      })
      setdislike(true),
      setlike(false)
      toast.success("Disliked")
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
}
  return (
    <>
    <div style={{ overflowX: 'hidden' }} className='w-full h-full '>
    <div className='bg-[#111111] w-full'  >
        <Navbar />
        {
          loading?
          <>
          {Array.from({ length: 1 }).map((_, i) => (
        <CardSkelton/>
      ))}
          </>
            :
            <>
            <div className='flex flex-wrap justify-center items-center m-0 p-0 w-[100vw] 'style={{ overflowX: 'hidden' }}>
            <div className='grid min-h-96 sm:grid-cols-12 gap-4 m-3 '>
            <div className='sm:h-80  w-full border rounded-lg shadow-md sm:col-span-5'>
              <div className="inner flex rounded-lg  sm:h-80   ">
                            <div 
                            onClick={() => setAddReview(false)}
                            className="image rounded-lg h-72 w-1/2   m-4">
                              <img 
                              className='h-60 w-full  rounded-lg'
                              src={movie.poster} alt="" />
                              <div className='justify-evenly  items-center gap-3 border  text-center rounded-lg  flex'>
                                
                                <form onSubmit={submitHandler1}>
                                 <button
                                type='submit'
          
                                 className='cursor-pointer text-white text-4xl m-2 '>{favorite ? <FaHeart color="red" /> : <CiHeart color="white" />}
                                </button>
                                 </form>
                                
                                <div>
                                <form onSubmit={Like}>
                                 <button
                                type='submit'
          
                                 className='cursor-pointer text-white text-3xl m-2 '>{like? <SlLike color='yellow'/>:<SlLike color='white'/> }
                                </button>
                                 </form>
                                </div>
                                <div>
                                <form onSubmit={Dislike}>
                                 <button
                                type='submit'
          
                                 className='cursor-pointer text-white text-3xl m-2 '>{dislike ? <SlDislike color='red' />:<SlDislike color='white'/>}
                                </button>
                                 </form>
                                </div>
                              </div>
                            </div>
                            <div className="content w-1/2 m-1 h-72  py-3 text-white">
                              <h2 className='text-md font-normal'>Name: {movie.title}</h2>
                              <h2 className='text-md font-normal'>Director:{movie.director??"Unknown"} </h2>
                              <h2 className='text-md font-normal'>Cast: {movie.cast??"Unknown"}</h2>
                              <h2 className='text-md font-normal'>Release : {movie.year}</h2>
                              <h2 className='text-md font-normal'>Rating: {movie.rating}</h2>
                              <div className="button mt-2"><Link to={`/discussion/movie/${movieId}`}><button className='sm:w-48  h-10 text-sm bg-green-500 hover:bg-green-800 hover:outline rounded-lg shadow-md '>Go to Discussion Room</button></Link></div>
                            </div>
                          </div>
            </div>
            <div className='h-80 border rounded-lg sm:col-span-7 hidden sm:block bg-teal-900 '>
              <h2 className='text-yellow-300 font-semibold text-center m-4 underline'>Description</h2>
              <p className='text-white text-lg  m-4'>
             {
              movie.plot
             }
              </p>
            </div>
            </div>
            </div>


            </>
        }
       
      </div>
      <div className='bg-[#111111] text-white z-50 'style={{ overflowX: 'hidden' }}>
        <h2 className='text-2xl font-semibold text-center pb-5 pt-5'>Review</h2>
        <button onClick={() => setAddReview(true)} className='bg-red-500 text-white w-36 rounded-lg shadow-md h-9 font-semibold ml-32 mb-2'>Add Review</button>
        <div ref={addReviewRef} className="review mb-4 bg-white h-1/2 w-full fixed" style={{ transform: 'translateY(250px)' }}>
          <AddReview addReview={addReview} setAddReview={setAddReview} />
        </div>
        {review.length > 0 ? (
          review.map((elem, idx) => (
            <Singlereview
              key={idx}
              comment={elem.comment}
              username={elem.user ? elem.user.fullname.firstname : 'Anonymous'}
              rating = {elem.rating}
              createdAt = {elem.createdAt}
            />
          ))
        ) : (
          <div>No reviews available.</div>
        )}
      </div>
    </div>
    </>
  );
}

export default SingleMovie;