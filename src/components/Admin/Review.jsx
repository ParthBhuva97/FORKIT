import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { MdDone } from "react-icons/md";

const Review = () => {
  const amountRef = useRef(null);
  const remarksRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [flag, setFlag] = useState(true);
  const [approveModel, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [projectId, setProjectId] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/projects/getprojects?status=pending")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      });
  }, [flag]);

  function handleApprove() {
    axios
      .get(
        `http://localhost:3000/projects/approve?project_id=${projectId}&amt=${amountRef.current.value}`
      )
      .then((response) => {
        console.log(response.data);
        setFlag(!flag);
        setApproveModal(false);
      });
  }
  function handleReject() {
    axios
      .post(`http://localhost:3000/projects/reject`,{
        project_id: projectId,
        remarks: remarksRef.current.value,
      })
      .then((response) => {
        console.log(response.data);
        setFlag(!flag);
      });
  }

  return (
    <>
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
                    <h1>{project.user_name}</h1>
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
                  <div
                    className="rounded bg-red-500 text-white p-3 flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setProjectId(project.project_id);
                      setRejectModal(true);
                    }}
                  >
                    <AiOutlineClose />
                  </div>
                  <div
                    className="rounded bg-green-500 text-white p-3 flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setProjectId(project.project_id);
                      setApproveModal(true);
                    }}
                  >
                    <MdDone />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* approveModal */}
      {approveModel ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">payment Info</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setApproveModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="w-full">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="name"
                    >
                      Amount (&#8377;)
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter amount"
                      id="name"
                      ref={amountRef}
                      required
                    ></input>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setApproveModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (amountRef.current.value === "") {
                        alert("Payment amount can't be 0");
                      } else {
                        setProjectId(projectId);
                        handleApprove();
                        setApproveModal(false);
                      }
                    }}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* approveModel ends here */}

      {/* rejectModal */}
      {rejectModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Specify the reason</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setRejectModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="w-full">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="name"
                    >
                      Justify the judgement
                    </label>
                    <textarea
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter Remarks"
                      id="name"
                      ref={remarksRef}
                      required
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setRejectModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (remarksRef.current.value === "") {
                        alert("Please Enter Remarks");
                      } else {
                        setProjectId(projectId);
                        console.log(remarksRef.current.value);
                        handleReject();
                        setRejectModal(false);
                      }
                    }}
                  >
                    Add Remark
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* rejectModal ends here */}
    </>
  );
};

export default Review;
