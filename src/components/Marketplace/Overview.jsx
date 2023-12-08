// In your second component (Overview)
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Home/Navbar";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const Overview = () => {
  const location = useLocation();
  const project = location.state?.project;
  const [showModal, setShowModal] = useState(false);

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:3000/payment/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:3000/payment/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Project Monetization Platform",
      description: "Develop and Earn",
      image: "/FORKIT.png",
      order_id: order.id,
      handler: async (response) => {
        setShowModal(true);
        axios.post("http://localhost:3000/projects/buyProject", {
          link: project.repo_link,
          token: localStorage.getItem("accessToken"),
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          user: localStorage.getItem("user"),
          amount: amount,
        });
      },
      // callback_url: `http://localhost:3000/payment/paymentverification?user=${localStorage.getItem("user")}&amt=${project.amount}`,
      // prefill: {
      //   name: "Gaurav Kumar",
      //   email: "gaurav.kumar@example.com",
      //   contact: "9999999999",
      // },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    razor.open();
  };

  return (
    <>
      <div className="w-full h-screen bg-black">
        {/* <Navbar /> */}
        <div className="w-full bg-white p-3 overflow-y-auto flex flex-col items-center justify-center">
          <div className="w-[80%] grid grid-cols-2 gap-5">
            <div className="">
              <img src={project.image} alt="" className="w-full h-[350px]" />
            </div>
            <div className="p-2 flex flex-col items-start justify-around">
              <div className="flex flex-col">
                <h1 className="text-gray-500 font-outfit leading-none">Web</h1>
                <h1 className="text-[3rem] font-bold font-outfit leading-none drop-shadow-md">
                  {project.title}
                </h1>
              </div>
              <div className="flex">
                <h1 className="font-outfit leading-none text-[1.5rem] text-indigo-500 drop-shadow-md">
                  Languages Used:
                  <span className="text-black drop-shadow-md">
                    {project.languages}
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-3 font-outfit leading-none ">
                <h1 className="text-indigo-500 text-[1.5rem]  drop-shadow-md">
                  Description:
                </h1>
                <span className="text-gray-500 text-[1rem]  drop-shadow-md">
                  {project.description}
                </span>
              </div>
              <div className="flex items-center justify-between w-full shadow-md p-2 rounded-lg">
                <div className="font-bold text-[1.5rem] drop-shadow-md text-green-600">
                  &#8377; {project.amount}
                </div>
                <div
                  className="bg-blue-500 text-white rounded-lg shadow-md py-3 px-5 cursor-pointer"
                  onClick={() => {
                    checkoutHandler(project.amount);
                  }}
                >
                  Buy Now
                </div>
              </div>
            </div>
          </div>
          {/* photos and video here */}

          <div className="w-[80%] my-5 py-3">
            <h1 className="text-[2rem] text-indigo-500 drop-shadow-md">
              Demo Video:
            </h1>
            <div className="w-full flex items-center justify-center">
              <video className="w-full h-full" controls>
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
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
                  <h3 className="text-3xl font-semibold">
                    Purchase Successfull
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <AiOutlineClose color="black" />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto gap-5 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <img src="done.svg" alt="" className="w-24 h-24" />
                  </div>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    <li>Transaction Completed Successfully.</li>
                    <li>
                      You can find the project on your github repository page.
                    </li>
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

export default Overview;
