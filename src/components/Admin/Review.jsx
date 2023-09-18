import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { MdDone } from "react-icons/md";

const Review = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/projects/getprojects?status=pending")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      });
  }, []);

  function handleApprove(id){
    axios
      .get(`http://localhost:3000/projects/approve?project_id=${id}`)
      .then((response) => {
        console.log(response.data);
      });
  }
  function handleReject(id) {
    axios
      .get(`http://localhost:3000/projects/reject?project_id=${id}`)
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <div className="w-full flex items-start justify-start flex-col gap-5">
      <h1 className="font-bold drop-shadow-md text-indigo-500 text-xl">
        Projects to Review
      </h1>
      <div className="w-full grid grid-cols-2 gap-5  items-center justify-center">
        {projects.map((project, index) => {
          return (
            <div className="hover:ring hover:outline-0 outline outline-1 ring-blue-200 ring-offset-2 flex items-start flex-col p-5 rounded-lg shadow-md gap-5">
              <div className="flex flex-col items-start">
                <h1 className="font-bold text-xl">
                  {project.repo_link.split("/")[5]}
                </h1>
                <div className="flex items-start gap-2 justify-center text-sm text-slate-500">
                  <FaUserAlt />
                  <h1>{project.user_id}</h1>
                </div>
              </div>
              <div className="w-full flex items-end justify-end pl-10 gap-2">
                <a
                  className="rounded outline outline-1 p-3 flex items-center justify-center cursor-pointer"
                  href={`https://www.github.com/${
                    project.repo_link.split("/")[4]
                  }/${project.repo_link.split("/")[5]}`}
                  target="_blank"
                >
                  <BsGithub />
                </a>
                <div className="rounded bg-red-500 text-white p-3 flex items-center justify-center cursor-pointer" onClick={()=>{
                    handleReject(project.project_id);
                }}>
                  <AiOutlineClose />
                </div>
                <div className="rounded bg-green-500 text-white p-3 flex items-center justify-center cursor-pointer" onClick={()=>{
                    handleApprove(project.project_id);
                }}>
                  <MdDone />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
