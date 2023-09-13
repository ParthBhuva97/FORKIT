import React from 'react'

const Hero = () => {
  return (
    <div className="w-full pt-44 flex flex-col items-center justify-center text-white font-header text-[1.5rem] md:text-[3rem] lg:text-[5rem] tracking-wide drop-shadow-lg">
      <h1>
        The{" "}
        <span className="text-transparent underline decoration-yellow-400 bg-clip-text bg-gradient-to-r from-[#375CB9] to-[#72BFD5]">
          Ultimate
        </span>
      </h1>
      <h1>
        <span className="text-transparent bg-clip-text underline decoration-yellow-400 bg-gradient-to-r from-[#E40909] to-[#FF7E7E]">
          Projects
        </span>{" "}
        Marketplace
      </h1>
    </div>
  );
}

export default Hero
