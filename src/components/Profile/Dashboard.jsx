import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BsUpload } from "react-icons/bs";
import { GrStatusUnknown } from "react-icons/gr";
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import "ldrs/mirage";

import Navbar from "../Home/Navbar";
import Uploads from "./Uploads";
import Instructions from "./Instructions";
import Status from "./Status";

const Dashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [authCode, setAuthcode] = useState(urlParams.get("code"));
  const [repos, setRepos] = useState([]);
  const [userData,setUserData] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const [page, setPage] = useState("instructions");
  const [totalProjects,setTotalProjects] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", response.data.login);
        if (response.data.login === "Fork-IT") {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin");
        }
        setUserData(response.data);
        axios.get(`http://localhost:3000/projects/getUserProjects?user=${response.data.login}`).then((response)=>{
          setTotalProjects(response.data.length);
        });
      })

  },[accessToken])

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



  function changeTab(index) {
    setPage(index);
  }
  function handleLogout(){
    localStorage.removeItem('accessToken');
    navigate('/');
  }
  return Object.keys(userData).length !== 0 ? (
    <div className="relative h-screen">
      <div className="w-full h-[10vh] pb-24 bg-black">
        <Navbar />
      </div>
      <div className="w-full bg-white rounded-t-lg flex items-start justify-center">
        <div className="w-full pt-3 h-[85vh] grid grid-cols-5 divide-x-2 divide-red-500">
          <div className="col-span-1">
            <div className="h-full p-2 flex items-center justify-between flex-col">
              <div className="flex items-center justify-center flex-col gap-3">
                <img
                  src={userData.avatar_url}
                  alt=""
                  className="rounded-full border border-black w-44 h-44"
                />
                <h1 className="font-bold py-1">{userData.login}</h1>
              </div>
              <hr className="w-[80%]" />
              <div className="w-full flex items-center flex-col justify-center">
                <div className="w-[80%] flex flex-col items-start gap-5 py-5">
                  <div
                    className={`w-full flex px-5 py-2 items-center gap-5 font-bold cursor-pointer ${
                      page === "instructions"
                        ? "bg-blue-400 text-white shadow-md"
                        : "hover:outline hover:outline-2 outline-blue-400"
                    } rounded-lg`}
                    onClick={() => {
                      changeTab("instructions");
                    }}
                  >
                    <MdOutlineIntegrationInstructions />
                    <h1 className="text-center">Instructions</h1>
                  </div>
                  <div
                    className={`w-full flex px-5 py-2 items-center gap-5 font-bold cursor-pointer ${
                      page === "uploads"
                        ? "bg-blue-400 text-white shadow-md"
                        : "hover:outline hover:outline-2 outline-blue-400"
                    } rounded-lg`}
                    onClick={() => {
                      changeTab("uploads");
                    }}
                  >
                    <BsUpload />
                    <h1 className="text-center">Uploads</h1>
                  </div>
                  <div
                    className={`w-full px-5 py-2 flex items-center gap-5 font-bold cursor-pointer ${
                      page === "status"
                        ? "bg-blue-400 text-white shadow-md"
                        : "hover:outline hover:outline-2 outline-blue-400"
                    } rounded-lg`}
                    onClick={() => {
                      changeTab("status");
                    }}
                  >
                    <GrStatusUnknown />
                    <h1 className="text-center">Status</h1>
                    <h1
                      className={`${
                        page === "status"
                          ? "bg-white text-black"
                          : "bg-blue-400 text-white"
                      } rounded-full px-3 py-2 text-[10px]  drop-shadow-md shadow-md`}
                    >
                      {totalProjects}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-full flex px-5">
                <div
                  className="flex py-2 px-5 items-center gap-5 font-bold text-red-700  cursor-pointer rounded-lg  hover:bg-red-700 hover:shadow-md hover:text-white duration-300"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <BiLogOutCircle />
                  <h1 className="text-center drop-shadow-lg">Logout</h1>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-4 p-5 overflow-y-scroll">
            {page === "uploads" ? (
              <Uploads repos={repos} />
            ) : page === "status" ? (
              <Status user={userData.login} />
            ) : page === "instructions" ? (
              <Instructions userData={userData} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <l-mirage size="100" speed="1.5" color="black"></l-mirage>
    </div>
  );
};

export default Dashboard;
