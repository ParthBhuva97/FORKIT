import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";


const Upload = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepos();
  }, [accessToken]);

  function fetchRepos() {
    axios
      .get(
        `http://localhost:3000/projects/getRepos?access_token=${accessToken}`
      )
      .then((response) => {
        console.log(response.data);
        setRepos(response.data);
      });
  }

  function handleUpload(id){
    console.log(id);
  }

  return (
    <div className="w-[100%] h-screen  flex justify-center items-center flex-col overflow-scroll">
      <div className="w-[75%] bg-gray-400 p-4 h-fit">
        <div className="grid gap-4">
          {repos.map((repo, index) => {
            return (
              <div
                className="flex hover:cursor-pointer justify-between p-5 bg-black rounded-lg text-white" key={index}
                onClick={()=>{
                    handleUpload(repo.id)
                }}
              >
                <div className="flex gap-2">
                  <div>
                    <BsGithub size={20} />
                  </div>
                  <div>{repo.name}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="flex items-center bg-gray-500 rounded-xl">
                    <div className="flex items-center justify-center gap-2 px-2 text-sm">
                      {repo.visibility === "private" ? (
                        <FaLock />
                      ) : (
                        <FaLockOpen />
                      )}
                      {repo.visibility}
                    </div>
                  </div>
                  <div className="rotate-180">
                    <BsChevronLeft />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Upload;
