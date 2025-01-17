import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Review from '../Components/AddReview';
import Singlereview from '../Components/Singlereview';
import{ useGSAP} from '@gsap/react'
import gsap from 'gsap';
import AddReview from '../Components/AddReview';
function SingleMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [review, setreview] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
const [addreview, setaddreview] = useState(false)
const addreviewRef = useRef(null)
// const [comment, setcomment] = useState('')
// const [rating, setrating] = useState('')





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
    

    // Only fetch if movieId is defined and not empty
//     if (movieId) {
//         fetchData1();
//     }
//   }, [movieId]);
  const fetchData2 = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/${movieId}/getreviews` ,{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        // console.log(data[0]);
        setreview(data[0]);
      } catch (err) {
        setError('Error fetching data2:', err);
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
}, []);

useEffect(() => {
  if (addreviewRef.current) {
    if (addreview) {
      gsap.to(addreviewRef.current, {
        y: -250,
          duration: 0.5,
          ease: 'power3.out',
      });
    } else {
      gsap.to(addreviewRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }
}, [addreview]);

  //  const submitHandler =async(e)=>{
  //         e.preventDefault();
  //         const FormData ={
  //             comment:comment,
  //             rating:rating
  //         }
  //         const token = localStorage.getItem('token');
  //         try {
  //           const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/review/${movieId}/postreviews`, formData, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           });
  //           console.log(response);
  //         } catch (err) {
  //           console.error('Error posting review:', err);
  //         }
  //     }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }
  

  return (
   <>
    <div className='bg-[#111111] w-full'>
      <Navbar />
      <div 
       
      onClick={()=>setaddreview(false)}
      className="cover rounded-lg h-80 ">
      
        <img className='h-full w-full rounded-lg' src="https://ccdiscovery.com/wp-content/uploads/2019/11/Laal-Singh-Chaddha-New-Poster.jpg" alt={movie.title} />
      </div>
      <div 
      className="content ">
        <div className="name text-[#797d80] text-sm">
          <span className='ml-1'>{movie.title}</span>
          <span className='ml-2'>Director: {movie.director}</span>
          <div>
            <span className='ml-2'>Cast: {movie.cast}</span>
            <span className='ml-2'>Release date: {movie.year}</span>
            <span>Review: 5★★★★★</span>
          </div>
          <div className='flex justify-around text-white items-center text-center pt-3'>
            <div className="Review bg-yellow-500 h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><button>Review</button></div>
            <div className="Watch Now bg-yellow-500 w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>Watch Now</button></div>
          </div>
          <div><h4 className='text-sm'>Get Ai Powered StoryLine of this Movie?</h4><button className='bg-white w-1/2 rounded-lg h-8 font-semibold text-black'>Click Here</button></div>
        </div>
      </div>
      
    </div>
    <div className='bg-[#111111] h-screen text-white z-50'>
      <h2 className='text-white text-2xl font-semibold text-center pb-5 pt-5'>Review</h2>
      <button
      onClick={()=>setaddreview(true)}
      className='bg-red-500 w-36 rounded-lg shadow-md h-9 font-semibold ml-32 mb-2'>Add Review</button>
     <div ref={addreviewRef} className="review  mb-4 bg-white h-1/2 w-full fixed"  style={{ transform: 'translateY(250px)' }} >
     {/* <form action=""
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
      </form> */}
      <AddReview setaddreview={setaddreview}/>
     </div>
      

      {
       review.map(item=>{
        return(
<Singlereview
comment={item.comment}
movieId={item.movie}
rating= {item.rating}
userId={item.user ? item.user._id : null}
/>
        )
        
       })
      }
      
    </div>
   </>
  );
}

export default SingleMovie;