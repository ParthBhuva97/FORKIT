import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';

const History = () => {
  const [projects, setProjects] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3000/projects/getprojects?status=all")
        .then((response) => {
          console.log(response.data);
          setProjects(
            response.data.filter((project) => project.status !== "pending")
          );
        });
    }, []);
  return (
    <div className="w-full flex items-start justify-start flex-col gap-5">
      <h1 className="font-bold drop-shadow-md text-indigo-500 text-xl">
        Reviewed Projects
      </h1>
      <div className="w-full grid grid-cols-2 gap-5  items-center justify-center">
        {projects.map((project, index) => {
          return (
            <div className="hover:ring hover:outline-0 outline outline-1 ring-blue-200 ring-offset-2 grid grid-cols-3 p-5 rounded-lg shadow-md gap-5">
              <div className="col-span-2 flex flex-col items-start">
                <h1 className="font-bold text-xl">
                  {project.repo_link.split("/")[5]}
                </h1>
                <div className="flex items-start gap-2 justify-center text-sm text-slate-500">
                  <FaUserAlt />
                  <h1>{project.user_id}</h1>
                </div>
              </div>
              <div className=" col-span-1 flex items-center justify-end">
                <div
                  className={`${
                    project.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } rounded-full p-3`}
                >
                  {project.status === "approved" ? (
                    <MdDone />
                  ) : (
                    <AiOutlineClose />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History
