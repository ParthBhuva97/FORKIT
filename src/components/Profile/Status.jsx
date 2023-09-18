import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {GoIssueClosed, GoProjectRoadmap} from "react-icons/go"
import { MdDone } from 'react-icons/md';
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai';

const Status = ({user}) => {
  const [userProjects, setUserProjects] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:3000/projects/getUserProjects?user=${user}`).then((response)=>{
      console.log(response.data);
      setUserProjects(response.data);
    })
  },[])
  return (
    <div className="flex items-start justify-start flex-col">
      <h1 className="text-indigo-500 font-bold">Status of your Projects</h1>
      <div className="w-full flex flex-col gap-2">
        {userProjects.map((project,index)=>{
          return (
            <div className="flex items-start justify-between rounded-lg shadow-md p-5 cursor-pointer">
              <div className="flex items-center justify-center gap-5">
                <GoProjectRoadmap size={25} />
                {project.repo_link.split("/")[5]}
              </div>
              <div className="flex items-center justify-center gap-5">
                {project.status === "pending" ? (
                  <AiOutlineClockCircle size={25} />
                ) : project.status === "approved" ? (
                  <GoIssueClosed size={25} />
                ) : project.status === "rejected" ? (
                  <AiOutlineClose size={25} />
                ) : (
                  ""
                )}
                {project.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Status
