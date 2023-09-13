import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BsUpload } from "react-icons/bs";
import { GrStatusUnknown } from "react-icons/gr";
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

import Navbar from "../Home/Navbar";
import Uploads from "./Uploads";
import Stauts from "./Stauts";
import Instructions from "./Instructions";

const Dashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [authCode, setAuthcode] = useState(urlParams.get("code"));
  const [repos, setRepos] = useState([]);
  const [userData,setUserData] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [page, setPage] = useState("uploads");
  const navigate = useNavigate();

  const views = {
    uploads: Uploads,
    status: Stauts,
    instructions: Instructions,
  };

  useEffect(() => {
    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);

      });
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

  

  function changeTab(index) {
    setPage(index);
  }
  function handleLogout(){
    localStorage.removeItem('accessToken');
    navigate('/');
  }
  const CurrentView = views[page];
  return (
    <div className="relative h-screen">
      <div className="w-full h-[10vh] pb-24 bg-black">
        <Navbar />
      </div>
      <div className="w-full p-5 bg-white rounded-t-lg flex items-start justify-center">
        <div className="w-[80%] h-[80vh] grid grid-cols-3">
          <div className=" col-span-1">
            <div className="h-full p-2 flex items-center justify-between flex-col">
              <div className="flex items-center justify-center flex-col gap-3">
                <img
                  src={userData.avatar_url}
                  alt=""
                  className="rounded-full border border-black w-52 h-52"
                />
                <h1 className="font-bold py-1">
                  {`${userData.name} / ${userData.login}`}
                </h1>
              </div>
              <hr className="w-[80%]" />
              <div className="w-full flex items-center flex-col justify-center">
                <div className="flex flex-col items-start gap-5 py-5">
                  <div
                    className="w-full flex px-5 py-2 items-center gap-5 font-bold cursor-pointer hover:underline decoration-blue-400 duration-300"
                    onClick={() => {
                      changeTab("uploads");
                    }}
                  >
                    <BsUpload />
                    <h1 className="text-center">Uploads</h1>
                  </div>
                  <div
                    className="w-full flex px-5 py-2 items-center gap-5 font-bold cursor-pointer hover:underline decoration-blue-400 duration-300"
                    onClick={() => {
                      changeTab("status");
                    }}
                  >
                    <GrStatusUnknown />
                    <h1 className="text-center">Status</h1>
                  </div>
                  <div
                    className="w-full flex px-5 py-2 items-center gap-5 font-bold cursor-pointer hover:underline decoration-blue-400 duration-300"
                    onClick={() => {
                      changeTab("instructions");
                    }}
                  >
                    <MdOutlineIntegrationInstructions />
                    <h1 className="text-center">Instructions</h1>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center px-5">
                <div className="w-full flex py-2 px-5 items-center gap-5 font-bold text-red-700  cursor-pointer rounded-lg outline outline-red-700 hover:bg-red-700 hover:text-white duration-300" onClick={()=>{
                  handleLogout();
                }}>
                  <BiLogOutCircle/>
                  <h1 className="text-center drop-shadow-lg">Logout</h1>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-2 p-5 overflow-y-scroll">
            {page === "uploads" ? (
              <CurrentView repos={repos} />
            ) : (
              <CurrentView />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
