import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import Upload from "./Upload";
import User from "./User";
import Sidebar from "./Sidebar";
import DashboardNav from "./DashboardNav";
import { FaLock, FaLockOpen } from "react-icons/fa";
import {  BsChevronRight } from "react-icons/bs";

const Dashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [authCode, setAuthcode] = useState(urlParams.get("code"));
  const [page, setPage] = useState("");
  const [repos, setRepos] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken === null) {
      axios
        .get(`http://localhost:3000/auth/getAccessToken?code=${authCode}`)
        .then((response) => {
          const accessParams = new URLSearchParams(response.data);
          console.log(accessParams.get("access_token"));
          localStorage.setItem("accessToken", accessParams.get("access_token"));
        })
        .then(() => {
          axios
            .get(
              `http://localhost:3000/projects/getRepos?access_token=${localStorage.getItem(
                "accessToken"
              )}`
            )
            .then((response) => {
              setRepos(response.data);
            });
        });
    } else {
      axios
        .get(
          `http://localhost:3000/projects/getRepos?access_token=${localStorage.getItem(
            "accessToken"
          )}`
        )
        .then((response) => {
          setRepos(response.data);
        });
    }
  }, [authCode]);
  //   localStorage.setItem("accessToken",accessToken);

  function handleUpload(index) {
    console.log(repos[index].name);
    console.log(repos[index].owner.login);

    if (repos[index].private) {
      axios
        .patch("http://localhost:3000/projects/changeVisibility", {
          owner: repos[index].owner.login,
          repo: repos[index].name,
          visibility: "public",
          access_token: localStorage.getItem("accessToken"),
        })
        .then((response) => {
          setTimeout(() => {
            axios
              .post("http://localhost:3000/projects/forkRepo", {
                owner: repos[index].owner.login,
                repo: repos[index].name,
                access_token: localStorage.getItem("accessToken"),
              })
              .then((response) => {
                console.log("Fork Successfull");
                console.log(response.data);
              });
          }, 3000);
        })
        .then((response) => {
          setTimeout(() => {
            axios
              .patch("http://localhost:3000/projects/changeVisibility", {
                owner: repos[index].owner.login,
                repo: repos[index].name,
                visibility: "private",
                access_token: localStorage.getItem("accessToken"),
              })
              .then((response) => {
                console.log("Changed Back to Private");
              });
          }, 5000);
        });
    } else {
      console.log("Upload Not Supported");
    }
  }

  return (
    <div className="bg-[#0E101D]">
      <ToastContainer/>
      <div className="h-[10vh]">
        <DashboardNav />
      </div>
      <div className="w-full py-3 flex h-[90vh]">
        <div className="w-[20%] ml-7 px-5 py-2">
          <div className="h-[100%] rounded-lg stroke-white overflow-hidden  bg-[rgba(45,74,147,0.4)]">
            <Sidebar />
          </div>
        </div>
        <div className="w-[80%] pl-0 pr-5 py-2 text-white flex gap-5 flex-col">
          <div className="w-full stroke-white grid grid-cols-2 py-2 divide-x-[0.2px] bg-[rgb(26,38,76)] rounded-lg h-[30%]">
            <div className="px-5 py-2">
              <p className="font-outfit">No of Projects Uploaded</p>
              <p className="text-[2.5rem]  h-[80%] flex items-center">100</p>
            </div>
            <div className="px-5 py-2 relative">
              <p className="font-outfit">Total Earnings</p>
              <p className="text-[2.5rem]  h-[80%] flex items-center">
                100000 Rs.
              </p>
              <div className="absolute bottom-0 right-7">
                Learn More about Payouts
              </div>
            </div>
          </div>
          <div className="w-full bg-[rgb(26,38,76)] stroke-white rounded-lg h-[70%] p-5 flex flex-col gap-3  accent-black">
            <p>Projects :</p>
            <div className="repos w-full flex flex-col gap-3 overflow-auto">
              {repos.map((repo, index) => {
                return (
                  <div
                    onClick={() => {
                      handleUpload(index);
                    }}
                    key={index}
                    className="w-full hover:cursor-pointer rounded-lg bg-[rgba(40,57,105,1)] py-3 px-3 flex items-center justify-between"
                  >
                    <div className="flex gap-5 items-center">
                      <div>
                        <AiFillGithub size={30} />
                      </div>
                      <div className="flex flex-col text-white font-outfit">
                        <div>{repo.name}</div>
                        <div>{repo.name}</div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <div className="flex items-center gap-2">
                        <div>
                          {repo.visibility === "private" ? (
                            <FaLock />
                          ) : (
                            <FaLockOpen />
                          )}
                        </div>
                        <div>{repo.visibility}</div>
                      </div>
                      <div>
                        <BsChevronRight />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
