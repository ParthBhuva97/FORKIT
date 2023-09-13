import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import {NavLink} from "react-router-dom";

// import github from "github";

const Navbar = () => {
  const CLIENT_ID = "88e57ed8caa28d190d41";
  const CLIENT_SECRET = "7f980fe2435063546e111fb850e7d6a3008be560";
  const REDIRECT_URI = "http://localhost:5173/profile";


  async function handleLogin() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo%20user`
    );
  }

  const [expanded, setExpanded] = useState(false);
  return (
    <nav className="flex items-center justify-between py-6 bg-transparent">
      <NavLink className="px-12" to="/">
        <img
          className="mix-blend-lighten"
          src="/FORKIT.png"
          alt=""
          height={100}
          width={100}
        />
      </NavLink>
      <div className="hidden md:flex justify-around items-center font-outfit text-white">
        <NavLink className="px-5 lg:px-12" to="/marketplace">Marketplace</NavLink>
        <div className="px-5 lg:px-12">Pricing</div>
        <div className="px-5 lg:px-12">About</div>
        <div className="px-5 lg:px-12">
          <button
            className="bg-blue-500 rounded-2xl px-5 py-3 hover:cursor-pointer"
            onClick={(e) => {
              handleLogin();
            }}
          >
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
        <div className="py-5">Marketplace</div>
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
};

export default Navbar;
