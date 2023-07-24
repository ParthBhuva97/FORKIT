import React from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Pricing = () => {
  return (
    <div className="py-10 w-full flex items-center justify-center flex-col gap-10">
      <div className=" text-white text-2xl">Pricing</div>
      <div className="md:flex w-[80%] items-center justify-around">
        {/* Card 1 */}
        <div className="text-white bg-[#06080C] bg-opacity-50 py-5 my-5 md:my-0 md:w-80 px-5 rounded-lg font-sans">
          <h1 className="text-xl">Free</h1>
          <h1 className="text-2xl">$0/month</h1>
          <div className="py-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Basic Access</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Limited Features</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Community Support</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <RxCross2 />
              </span>
              <h1>Zero Project Access</h1>
            </div>
          </div>
          <div className="pt-4 flex justify-center">
            <button className="bg-blue-500 rounded-2xl px-5 py-3 font-outfit">
              Sign Up
            </button>
          </div>
        </div>
        {/* Card 2 */}
        <div className="text-white bg-[#152124] bg-opacity-50 py-5 my-5 md:my-0 md:w-80 px-5 rounded-lg font-sans">
          <h1 className="text-xl">Basic</h1>
          <h1 className="text-2xl">$9.99/month</h1>
          <div className="py-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Basic Access</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Limited Features</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Community Support</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <RxCross2 />
              </span>
              <h1>Zero Project Access</h1>
            </div>
          </div>
          <div className="pt-4 flex justify-center">
            <button className="bg-blue-500 rounded-2xl px-5 py-3 font-outfit">
              Upgrade Now
            </button>
          </div>
        </div>
        {/* Card 3 */}
        <div className="text-white bg-[#06080C] bg-opacity-50 py-5 my-5 md:my-0 md:w-80 px-5 rounded-lg font-sans">
          <h1 className="text-xl">Premium</h1>
          <h1 className="text-2xl">$19.99/month</h1>
          <div className="py-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Basic Access</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Limited Features</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineDone />
              </span>
              <h1>Community Support</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <RxCross2 />
              </span>
              <h1>Zero Project Access</h1>
            </div>
          </div>
          <div className="pt-4 flex justify-center">
            <button className="bg-blue-500 rounded-2xl px-5 py-3 font-outfit">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
