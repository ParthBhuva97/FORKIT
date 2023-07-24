import React from "react";
import {
  FaGithubSquare,
  FaFacebookSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      {/* General */}
      <div className="w-full bg-[url(/Footer.png)] bg-cover  md:h-[400px] hidden md:flex items-center justify-center py-10 text-white">
        <div className="grid grid-cols-2 h-[100%] w-[80%]">
          <div className="w-[50%] flex flex-col  justify-between">
            <div className="font-outfit">
              FORKIT is one of World largest communities that provides a
              one-stop platform for people to download and Upload their Project.
            </div>
            <div className="flex gap-10">
              <div>Contact</div>
              <div className="flex gap-3">
                <FaGithubSquare />
                <FaTwitterSquare />
                <BsInstagram />
                <BsLinkedin />
                <FaFacebookSquare />
              </div>
            </div>
            <div className="font-bold">
              Copyright © 2023 All Rights Reserved
            </div>
          </div>
          {/* Col 2 */}
          <div className="flex justify-end gap-20  px-10">
            <div className="flex flex-col gap-5">
              <div className="font-sans">Market</div>
              <div className="flex flex-col font-outfit">
                <h1 className="py-3">Browse Projects</h1>
                <h1 className="py-3">Buy Projects</h1>
                <h1 className="py-3">Sell Projects</h1>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="font-sans">Company</div>
              <div className="flex flex-col font-outfit">
                <h1 className="py-3">Home</h1>
                <h1 className="py-3">About</h1>
                <h1 className="py-3">Pricing</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <div className="block md:hidden h-fit bg-black">
        <div className="flex flex-col gap-5 text-white px-3 py-5">
          <h1>
            FORKIT is one of World largest communities that provides a one-stop
            platform for people to download and Upload their Project.
          </h1>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-5">
              <div className="font-sans">Market</div>
              <div className="flex flex-col font-outfit">
                <h1 className="py-3">Browse Projects</h1>
                <h1 className="py-3">Buy Projects</h1>
                <h1 className="py-3">Sell Projects</h1>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <div className="flex flex-col gap-5">
                <div className="font-sans">Company</div>
                <div className="flex flex-col font-outfit">
                  <h1 className="py-3">Home</h1>
                  <h1 className="py-3">About</h1>
                  <h1 className="py-3">Pricing</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <div>Contact</div>
            <div className="flex gap-3">
              <FaGithubSquare />
              <FaTwitterSquare />
              <BsInstagram />
              <BsLinkedin />
              <FaFacebookSquare />
            </div>
          </div>
          <div className="font-bold">Copyright © 2023 All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
