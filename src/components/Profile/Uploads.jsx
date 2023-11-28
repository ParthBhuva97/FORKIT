import React, { useState } from "react";
import { GiMoneyStack, GiCloudUpload } from "react-icons/gi";
import { AiFillGithub, AiOutlineClose } from "react-icons/ai";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import axios from 'axios';

const Uploads = ({ repos }) => {
  const [showModal, setShowModal] = useState(false);
  function handleUpload(index) {
    setShowModal(true);
    console.log(repos[index].name);
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
                if (response.status === 200) {
                  console.log("Fork Successfull");
                  console.log(response.data);
                } else {
                  console.log("error");
                }
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

            setTimeout(() => {
            }, 1000);
          }, 5000);
        });
    } else {
      console.log("Upload Not Supported");
    }
  }
  return (
    <>
      <div className="w-full flex items-center justify-center flex-col gap-5 font-outfit">
        <div className="w-full grid grid-cols-2 gap-5">
          {/* <div className="ring-1 ring-offset-2 rounded-lg grid grid-cols-3">
            <div className="col-span-1">
                <GiMoneyStack/>
            </div>
            <div className="col-span-2 flex items-start justify-center flex-col">
                <h1>5000</h1>
                <h1>Money Earned</h1>
            </div>
        </div> */}
          <div class=" bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl  px-5">
            <div class="md:flex">
              <div class="md:flex-shrink-0 flex items-center justify-center">
                <GiMoneyStack size={50} />
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  50,000
                </div>
                <p class="mt-2 text-gray-500">Money Earned</p>
              </div>
            </div>
          </div>
          <div class=" bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl  px-5">
            <div class="md:flex">
              <div class="md:flex-shrink-0 flex items-center justify-center">
                <GiCloudUpload size={50} />
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  10
                </div>
                <p class="mt-2 text-gray-500">Projects Uploaded</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="font-bold">Your Repos</h1>
          <div className="flex flex-col gap-2">
            {repos.map((repo, index) => {
              return (
                <div
                  className="flex items-start justify-between rounded-lg shadow-md p-5 cursor-pointer"
                  onClick={() => {
                    handleUpload(index);
                  }}
                >
                  <div className="flex items-center justify-center gap-5">
                    <AiFillGithub size={25} />
                    {repo.name}
                  </div>
                  <div className="flex items-center gap-2">
                    {repo.visibility === "private" ? (
                      <FaLock />
                    ) : (
                      <FaLockOpen />
                    )}
                    <BsChevronRight />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Project Status</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <AiOutlineClose color="black"/>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    The Project has been uploaded successfully on the platform.
                    Our Team will review it soon and you will be notified shortly.
                    You can track the Status of the Project on Status section of the website.
                    Thank you for your patience.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Uploads;
