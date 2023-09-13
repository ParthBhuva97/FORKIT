import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import {FiFilter} from "react-icons/fi";
import axios from "axios";
import Projectcard from './Projectcard';

const Marketplace = () => {
  const [projects,setProjects] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3000/projects/getProjects').then((response)=>{
      // console.log(response.data);
      setProjects([...response.data]);
    })
  },[])
  console.log(projects);
  return (
    <div className="w-full bg-black">
      <Navbar />
      <div className="w-full h-500 bg-[#dddbe7] border rounded-t-xl">
        <div className="relative top-0  w-full">
          <div className="sticky flex items-center justify-center flex-col py-10">
            <h1 className="text-[40px] ">
              Get the{" "}
              <span className="bg-[#9C9FE1] px-5 font-header">Right</span>{" "}
              Projects
            </h1>
            <div className="flex items-center w-full py-5 justify-center gap-2 bg-[#d0d4e7] mt-5">
              <div className="w-[50%] flex items-center justify-center">
                <input
                  className="w-[70%] p-3 rounded-l-3xl border border-black"
                  type="text"
                  placeholder="Search Projects"
                />
                <button className="w-[20%] rounded-r-3xl py-3 px-5 border border-black text-yellow-400 bg-black">
                  Search
                </button>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <select
                  name=""
                  id=""
                  className="w-[40%] py-2 px-3 rounded-l-3xl border border-black"
                >
                  <option value="" selected>
                    Select Domain
                  </option>
                  <option value="Web">Web</option>
                  <option value="Web">Web</option>
                  <option value="Web">Web</option>
                </select>
                <select
                  name=""
                  id=""
                  className="w-[40%] py-2 px-3 border border-black"
                >
                  <option value="" selected>
                    Select Language
                  </option>
                  <option value="Web">Web</option>
                  <option value="Web">Web</option>
                  <option value="Web">Web</option>
                </select>
                <div className="w-[10%] rounded-r-3xl p-3 border border-black">
                  <FiFilter size={22} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className=" gap-5">
              {projects.map((project,index)=>{
                return <Projectcard project={project} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marketplace
