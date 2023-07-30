import React from 'react'
import Hero from "./Hero";
import Navbar from "./Navbar";
import Infographics from './Infographics';
import Pricing from './Pricing';
import Testimonial from './Testimonial';
import Footer from './Footer';
const Home = () => {
  return (
    // <div className="w-[100vw] bg-[#0E101D]">
    // <Navbar/>
    // </div>
    <div className="relative w-full bg-[#0E101D]">
      <span className="absolute top-24 blur-3xl bg-[#72BFD5] w-32 h-32 md:w-52 md:h-52 rounded-full text-white shadow-3xl shadow-white">
        &nbsp;
      </span>
      <div className="w-full">
        <Navbar />
        <Hero />
        <Infographics />
        <Pricing/>
        <Testimonial/>
        <Footer/>
      </div>
      <span className="absolute top-[1550px] right-0 blur-3xl bg-[#72BFD5] w-52 h-52 rounded-full text-white shadow-3xl shadow-white">
        &nbsp;
      </span>
    </div>
  );
}

export default Home
