import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function About() {
  return (
    <div className='bg-[#111111]  w-full'>
<Navbar/>
<h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>About Us</h2>
<h3 className='text-white font-semibold text-lg pl-3'>Your Movie Haven: Where Cinema Comes to Life</h3>
<p className='text-white text-sm font-serif pl-4 '>
<h2 className='pb-3 text-yellow-400 font-bold'>Our Passion:
<hr />
</h2>

<p className=''>"We're a team of dedicated cinephiles who believe that movies have the power to transport us, entertain us, and inspire us. We're passionate about sharing our love for film with the world and helping others discover the magic of the silver screen."</p>
<h2 className='pb-3 text-yellow-400 mt-2 font-bold'>Our Mission: 
<hr />
</h2>
<p className=''>"Our mission is to create a vibrant online community for movie lovers. We strive to provide insightful and engaging reviews, curated lists, and valuable resources to help you navigate the ever-growing world of cinema."</p>
<h2 className='pb-3 text-yellow-400  mt-2 font-bold'>What We Offer:
<hr />
</h2>
    <h1 className='pt-1 text-yellow-400 pb-1' >Expert Reviews:</h1> "Our team of experienced film critics provides in-depth and unbiased reviews of the latest releases, from Hollywood blockbusters to independent gems."
    <h1 className='pt-1 text-yellow-400 pb-1'>User-Generated Content:</h1> "We encourage user participation with a platform for you to share your own thoughts, reviews, and recommendations."
    <h1 className='pt-1 text-yellow-400 pb-1'>Curated Lists & Guides:</h1> "Discover hidden gems, explore different genres, and find the perfect movie for any mood with our expertly curated lists and insightful guides."
    <h1 className='pt-1 text-yellow-400 pb-1'>Community Forum:</h1> "Connect with other film enthusiasts, participate in discussions, and share your passion for cinema with a like-minded community."
<h2 className= 'pb-3 text-yellow-400  mt-2 font-bold'>Our Values:
<hr />
</h2>
   <h1 className='pt-1 text-yellow-400 pb-1'>Honesty and Transparency:</h1>  "We believe in providing honest and unbiased opinions, backed by sound reasoning and critical analysis."
   <h1 className='pt-1 text-yellow-400 pb-1'>Community Focus:</h1> "We value the input and contributions of our users and strive to create a welcoming and inclusive community."
   <h1 className='pt-1 text-yellow-400 pb-1'>Passion for Film:</h1> "Our love for cinema drives everything we do, and we're dedicated to sharing that passion with you."



</p>

<div className='bg-white mt-3'><Footer/></div>
    </div>
  )
}

export default About