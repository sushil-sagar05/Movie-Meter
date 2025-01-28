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
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/${movieId}/getreviews`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReview(data);
      } catch (err) {
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



const submitHandler=async(e)=>{
  e.preventDefault()
try {
  const token = localStorage.getItem('token');
  if(!favorite) {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/user/favourites/${movieId}`,{},  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 
    setfavorite(true);
    toast.success('Added To favorites')
  }
  else {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/favourites/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setfavorite(false)
    toast.success("Remove")
  }
} catch (error) {
  console.error('Error toggling favorite:', error);
}

}

  return (
    <>
      <div className='bg-[#111111] w-full' style={{ overflowX: 'hidden' }} >
        <Navbar />
        {
          loading?
          <>
          {Array.from({ length: 1 }).map((_, i) => (
        <CardSkelton/>
      ))}
          </>
            :
            <div className='flex justify-center pt-5'>
            <div className='border-2 rounded-lg  '>
            <div onClick={() => setAddReview(false)} className="cover  rounded-lg ">
              <div className="image  flex justify-center items-center">
              <img className='h-80 w-full rounded-lg' src={movie.poster} 
              
              alt={movie.title} />
              </div>
             <div className="love absolute text-4xl right-0">
              <form onSubmit={submitHandler}>
              <button
              type='submit'
          
              className='cursor-pointer text-white mr-4 pt-2'>{favorite ? <FaHeart color="red" /> : <CiHeart color="white" />}
              </button>
              </form>
             </div>
              
            </div>
            <hr className='mt-2' />
            <div className="content rounded-lg h-36 bg-[#141b23] text-white">
              <div className="name  text-sm">
                <span className='ml-1'>{movie.title}</span>
                <span className='ml-2'>Director: {movie.director}</span>
                <div>
                  <span className='ml-2'>Cast: {movie.cast}</span>
                  <span className='ml-2 mr-2'>Release date: {movie.year}</span>
                  <span>Review: 5★★★★★</span>
                </div>
                <div className='flex justify-around text-white items-center text-center pt-1'>
                
                  <div className="Watch Now bg-[#23c65d] w-1/2 h-9 font-semibold pt-2 rounded-lg text-center">
                    <Link to={`/discussion/movie/${movieId}`}><button
                    
                    >Go To Discussion</button></Link>
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          </div>
        }
       
      </div>
      <div className='bg-[#111111] text-white z-50'>
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
    </>
  );
}

export default SingleMovie;