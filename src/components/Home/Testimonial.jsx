import React from "react";
import {BiSolidStar} from "react-icons/bi"

const Testimonial = () => {
  return (
    <div className="py-10 w-full flex items-center justify-center flex-col gap-10">
      <div className=" text-white text-2xl">Testimonials</div>
      <div className="md:flex items-center justify-center ">
        {/* Card 1 */}
        <div className="relative card lg:w-80 lg:mx-2">
          <img
            className="absolute top-[-75px] md:top-0 left-[50%] translate-x-[-50%] h-44 w-44 rounded-full"
            src="./profile2.jpg"
            alt=""
          />
          <div className="mt-20 text text-white bg-black pt-28 py-5 px-5">
            <h1 className="text-2xl text-center py-2">John Doe</h1>
            <div className="flex gap-2 justify-center text-blue-500">
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="w-[80%] text-center pt-10 pb-3">
                “Best website for project download and Best to upload project.”
              </h1>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="relative card lg:w-80 lg:mx-2 my-5 md:my-0">
          <img
            className="absolute top-[-75px] md:top-0 left-[50%] translate-x-[-50%] h-44 w-44 rounded-full"
            src="./profile2.jpg"
            alt=""
          />
          <div className="mt-20  text text-white bg-black pt-28 py-5 px-5">
            <h1 className="text-2xl text-center py-2">John Doe</h1>
            <div className="flex gap-2 justify-center text-blue-500">
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="w-[80%] text-center pt-10 pb-3">
                “Best website for project download and Best to upload project.”
              </h1>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="relative card lg:w-80 lg:mx-2 my-5 md:my-0">
          <img
            className="absolute top-[-75px] md:top-0 left-[50%] translate-x-[-50%] h-44 w-44 rounded-full"
            src="./profile2.jpg"
            alt=""
          />
          <div className="mt-20  text text-white bg-black pt-28 py-5 px-5">
            <h1 className="text-2xl text-center py-2">John Doe</h1>
            <div className="flex gap-2 justify-center text-blue-500">
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
              <BiSolidStar />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="w-[80%] text-center pt-10 pb-3">
                “Best website for project download and Best to upload project.”
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
