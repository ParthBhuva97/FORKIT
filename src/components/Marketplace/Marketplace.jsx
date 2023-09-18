import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import {FiFilter} from "react-icons/fi";
import axios from "axios";
import Projectcard from './Projectcard';

const Marketplace = () => {
  const [projects,setProjects] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3000/projects/getProjects?status=approved').then((response)=>{
      // console.log(response.data);
      setProjects([...response.data]);
    })
  },[])
  console.log(projects);
  return (
    <div className="w-full bg-black">
      <Navbar />
      <div className="w-full h-[80vh]  bg-white border rounded-t-xl">
        <div className="relative top-0  w-full">
          <div className="sticky flex items-start justify-start flex-col py-5">
            <div className="flex items-center w-full py-5 justify-center gap-2">
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
            <h1 className="text-3xl font-bold text-indigo-500 underline p-5">
              Projects:
            </h1>
          </div>
          <div className="w-full flex items-start justify-start px-5 ">
            <div className="w-full grid grid-cols-3 gap-5 ">
              {projects.map((project, index) => {
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
