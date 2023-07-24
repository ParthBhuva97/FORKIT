import React, { useState } from 'react'
import { BiMenu } from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai"

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav className="flex items-center justify-between py-6 bg-transparent">
      <div className="px-12">
        <img
          className="mix-blend-lighten"
          src="/FORKIT.png"
          alt=""
          height={100}
          width={100}
        />
      </div>
      <div className="hidden md:flex justify-around items-center font-outfit text-white">
        <div className="px-5 lg:px-12">Projects</div>
        <div className="px-5 lg:px-12">Pricing</div>
        <div className="px-5 lg:px-12">About</div>
        <div className="px-5 lg:px-12">
          <button className="bg-blue-500 rounded-2xl px-5 py-3">
            Get Started
          </button>
        </div>
      </div>
      {/* Responsive Menu */}
      <div
        className="md:hidden flex border border-white rounded-lg p-1 mx-3"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? <AiOutlineClose color="white" /> : <BiMenu color="white" />}
      </div>

      <div
        className={`fixed md:hidden top-[72px] w-full h-screen flex items-center duration-300 flex-col bg-black text-white font-outfit ${
          expanded ? "left-[0px]" : "left-[-450px]"
        }`}
      >
        <div className="py-5">Projects</div>
        <div className="py-5">Pricing</div>
        <div className="py-5">About</div>
        <div className="py-5">
          <button className="bg-blue-500 rounded-2xl px-5 py-3">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
