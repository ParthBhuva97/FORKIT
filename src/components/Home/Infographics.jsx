import React from "react";
import Playarea from "./Playarea";

const Infographics = () => {
  return (
    <div className="flex items-center justify-center pt-[5rem]">
      <div className="md:grid grid-rows-4  w-[85%]">
        <div className="md:grid grid-cols-2 gap-20">
          <div className="flex flex-col justify-center text-white px-3">
            <h1 className="font-outfit md:text-[2.5rem] pt-16">
              Empowering Project Creators and Buyers: Join Our Monetization
              Platform for Maximum Value Exchange
            </h1>
            <div className="w-[60%]">
              <h1 className="font-sans py-3 md:text-[1.2rem] text-[#DCD9E0]">
                The most Efficient marketplace for buying and selling Project.
              </h1>
            </div>
            <div className="py-2">
              <button className="bg-blue-500 rounded-2xl px-5 py-3 font-outfit">
                Get Started
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center pt-7">
            <img className="h-[80%]" src="/obj1.png" alt="" />
          </div>
        </div>
        {/* Row 2 */}
        <div className="md:grid grid-cols-2 gap-20">
          <div className="flex items-center justify-start pt-4">
            <img className="h-[80%]" src="/obj2.png" alt="" />
          </div>
          <div className="flex flex-col justify-center text-white px-3">
            <h1 className="font-outfit md:text-[3rem] w-[50%]">
              Unleash Your Potential
            </h1>
            <div className="w-[80%]">
              <h1 className="font-sans py-3 md:text-[1.2rem] text-[#DCD9E0]">
                Ready to showcase your skills and make some dough? Upload your
                projects now and watch the magic happen. Buyers, it's time to
                discover hidden gems and snag the perfect projects for your
                needs.
              </h1>
            </div>
            <div className="pt-4">
              <button className="bg-blue-500 rounded-2xl px-5 py-3 font-outfit">
                Get Started
              </button>
            </div>
          </div>
        </div>
        {/* Row 3 */}
        <div className="w-full my-20 flex flex-col gap-5">
          <h1 className="font-sans text-white">Languages We Offer</h1>
          <Playarea />
        </div>
        {/* Row 4 */}
        <div className="md:grid grid-cols-2 gap-10 py-20">
          <div className="flex flex-col justify-center text-white px-3">
            <div className="">
              <h1 className="font-outfit md:text-[3rem] w-[50%]">How It Works</h1>
            </div>
            <div>
              <h1 className="font-sans py-3 md:text-[1.2rem] text-[#DCD9E0]">
                Simple as pie! Creators upload their projects, set a price, and
                flaunt their talents for potential buyers to see. Buyers browse
                the vast project library, filter results, and purchase projects
                that tickle their fancy. Our secure payment system ensures a
                smooth transaction, so creators get paid and buyers get their
                projects hassle-free.
              </h1>
            </div>
            <div className="pt-4">
              <button className="bg-blue-500 rounded-2xl px-5 py-3 font-outfit">
                Learn More
              </button>
            </div>
          </div>
          <div className="pt-5 md:pt-0">
            <img src="/proof.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infographics;
