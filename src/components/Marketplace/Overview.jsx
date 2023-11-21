// In your second component (Overview)
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Home/Navbar"

const Overview = () => {
  const location = useLocation();
  const project = location.state?.project;
  console.log(project);
  // Now you can use the 'project' object as needed

  return (
    <div className="w-full h-screen bg-black">
      <Navbar />
      <div className="w-full bg-white p-3 overflow-y-auto flex flex-col items-center justify-center">
        <div className="w-[80%] grid grid-cols-2 gap-5">
          <div className="">
            <img
              src="https://www.liquidplanner.com/wp-content/uploads/2019/04/HiRes-17.jpg"
              alt=""
              className="object-cover"
            />
          </div>
          <div className="p-2 flex flex-col items-start justify-between">
            <div className="flex flex-col">
              <h1 className="text-gray-500 font-outfit leading-none">Web</h1>
              <h1 className="text-[3rem] font-bold font-outfit leading-none drop-shadow-md">
                {project.title}
              </h1>
            </div>
            <div className="flex">
              <h1 className="font-outfit leading-none text-[1.5rem] text-indigo-500 drop-shadow-md">
                Languages Used:
                <span className="text-black drop-shadow-md">
                  {project.languages}
                </span>
              </h1>
            </div>
            <div className="flex flex-col gap-3 font-outfit leading-none ">
              <h1 className="text-indigo-500 text-[1.5rem]  drop-shadow-md">
                Description:
              </h1>
              <span className="text-gray-500 text-[1rem]  drop-shadow-md">
                {project.description}
              </span>
            </div>
            <div className="flex items-center justify-between w-full shadow-md p-2 rounded-lg">
              <div className="font-bold text-[1.5rem] drop-shadow-md text-green-600">
                &#8377; {project.amount}
              </div>
              <div className="bg-blue-500 text-white rounded-lg shadow-md py-3 px-5 cursor-pointer">
                Buy Now
              </div>
            </div>
          </div>
        </div>
        {/* photos and video here */}

        <div className="w-[80%] my-5 py-3  flex flex-col gap-3 items-start justify-start">
          <h1 className="text-[2rem] text-indigo-500 drop-shadow-md">
            Screenshots:{" "}
          </h1>
          <div className="w-full flex items-center justify-center">
            <img src={project.image} alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
