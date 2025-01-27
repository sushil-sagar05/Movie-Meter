import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CardSkelton from '../Components/Skelton/CardSkelton'
import Pagination from '../Components/Pagination'
function Contact() {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [totalMovies, settotalMovies] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  const LIMIT = 10;
useEffect(()=>{
  const FetchMovie = async (page)=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/get-movies`,{
        params:{page,limit:LIMIT}
      });
      // console.log(data)
      setdata(response.data.movies)
      settotalMovies(response.data.total)
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally{
      setloading(false)
    }
    }
    FetchMovie(currentPage)
},[currentPage])
const totalPages =  Math.ceil(totalMovies / LIMIT);
const handlePageChange = (page) => {
 setcurrentPage(page);
};

  return (
    <div className='bg-[#111111] ' style={{ overflowX: 'hidden' }}>
    <Navbar />
    <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Review</h2>
    <h2 className='text-2xl text-yellow-500 font-semibold text-center pb-5 pt-5 '>Give Back To Community . Review and Rate Movies</h2>
    <h2 className='text-sm text-white font-semibold text-center pb-5 pt-1'> So Others Don't Have to Brainstorm Here and There..</h2>
    <hr />
    {
      loading ?
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkelton />
          ))}
        </> :
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {
            data.map((data, idx) => {
              return (
                <div key={idx} className="card ">
                  <div className='bg-[#141b23] rounded-lg shadow-md w-80 ml-5 mt-5'>
                    <div className="cover rounded-lg h-64 w-80">
                      <img className='h-full w-full rounded-lg' src={data.poster} alt="" />
                    </div>
                    <div className="content h-36 pt-3">
                      <div className="name text-[#797d80] text-sm">
                        <span className='ml-1'>{data.title}</span>
                        <span className='ml-2'>{data.director} </span>
                        <div>
                          <span className='ml-2'>Cast: Sagar, Swati</span>
                          <span className='ml-2'>Release date: 20/20/2024</span>
                        </div>
                        <div className='flex justify-around text-white items-center text-center pt-5'>
                          <div className="Review bg-yellow-500 h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2">
                            <Link to={`/movie/${data._id}/review`}><button>Review</button></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    }

    <div className="footer bg-white"><Footer /></div>
</div>

  )
}

export default Contact