import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Instructions = ({ userData }) => {
  const emailRef = useRef();
  const upiRef = useRef();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    emailRef.current.value =
      localStorage.getItem("email") !== "null"
        ? localStorage.getItem("email")
        : "";
    upiRef.current.value =
      localStorage.getItem("upi_id") !== "null"
        ? localStorage.getItem("upi_id")
        : "";
  }, []);

  function handleUpdate() {
    const data = {
      ...userData,
      email: emailRef.current.value,
      upi_id: upiRef.current.value,
    };
    console.log(data);
    axios
      .post("http://localhost:3000/users/updateUser", data)
      .then((response) => {
        console.log(response.data);
      });
    localStorage.setItem("email", emailRef.current.value);
    localStorage.setItem("upi_id", upiRef.current.value);
  }

  return (
    <>
      <div className="w-full p-5 flex items-start justify-start flex-col gap-5">
        <div className="w-full shadow-md rounded-lg flex gap-5 items-start justify-start flex-col p-5">
          <h1 className="text-xl text-indigo-500 font-bold drop-shadow-md ">
            Complete your Profile
          </h1>
          <form className="w-full flex items-start justify-start gap-5">
            {/* <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              className="w-[45%] p-2 rounded-lg focus:outline-none outline outline-1 focus:ring ring-blue-200 ring-offset-2"
            /> */}
            <input
              ref={emailRef}
              className="w-[45%] flex h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email Address"
            />
            <input
              ref={upiRef}
              className="w-[45%] flex h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="UPI ID"
            />
          </form>
          <div className={`w-full flex items-end justify-end py-2`}>
            <button
              className="bg-blue-500 text-white p-3 rounded-lg shadow-md"
              onClick={() => {
                handleUpdate();
                setShowModal(true);
              }}
            >
              Complete Profile
            </button>
          </div>
        </div>
        <div className="w-full shadow-md rounded-lg flex gap-5 items-start justify-start flex-col p-5">
          <h1 className="text-xl text-indigo-500 font-bold drop-shadow-md ">
            Instructions
          </h1>
          <ul className="flex flex-col gap-3 font-outfit text-xl list-disc p-5">
            <li>
              Please Complete your profile before uploading any projects to the
              platform.
            </li>
            <li>
              Your Github Project should have a readme file in &nbsp;
              <a
                href="https://drive.google.com/uc?export=download&id=1SpHy8icR0stCYih0tSjAztNCrw6EbZJd"
                className="text-blue-500 cursor-pointer hover:underline decoration-blue-500"
              >
                This Format.
              </a>
            </li>
            <li>
              Your projects will be carefully reviewed by our admins and your
              payout will be decided by admin.
            </li>
          </ul>
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
                  <h3 className="text-3xl font-semibold">
                    Profile Updated Successfully
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto flex items-center justify-center">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed ">
                    <img src="./verified.gif" alt="" className="w-44 h-44" />
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

export default Instructions;
