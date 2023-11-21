import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";

import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Projectcard = ({ project, buyProject }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");


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
      <div className="shadow-md rounded-lg p-5 flex flex-col items-start justify-start gap-3">
        <h1 className="font-bold text-indigo-500 text-xl">{project.title}</h1>
        <div>
          <h2 className="font-bold">Languages: </h2>
          <p className="font-bold text-gray-500">{project.languages}</p>
        </div>
        <div>
          <h2 className="font-bold">Description: </h2>
          <p className="font-bold text-gray-500">{project.description}</p>
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          <div className="font-bold text-xl drop-shadow-md text-green-600">&#8377; {project.amount}</div>
          <div className="flex gap-3">
            <div
              className="flex items-center justify-center gap-3 p-3 bg-gray-500 text-white rounded-lg shadow-md cursor-pointer"
              onClick={() => {
                navigate("/overview", { state: { project } });
              }}
            >
              <h1>Learn More</h1>
            </div>
            <div
              className="flex items-center justify-center gap-3 p-3 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer"
              onClick={() => {
                // buyProject(project);
                checkoutHandler(project.amount);
              }}
            >
              <LuShoppingCart />

              <h1>Buy Project</h1>
            </div>
          </div>
        </div>
        {/* <ReactMarkdown>
        {title}
        
      </ReactMarkdown> */}
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

export default Projectcard;
