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
            <details class="group rounded-lg shadow-md p-5 cursor-pointer">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>{project.repo_link.split("/")[5]}</span>
                <div className="flex gap-3">
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
                  {project.status !== "pending" ? (
                    <span class="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  ) : null}
                </div>
              </summary>
              <p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                {project.status === "approved" ? (
                  <h1>Payout : {project.amount}</h1>
                ) : project.status === "rejected" ? 
                (
                  <h1>Remarks : {project.remarks}</h1>
                ) : <h1>Project is yet to evaluated.</h1>}
              </p>
            </details>
          );
        })}
      </div>
    </div>
  );
}

export default Status
