import React from 'react'

const DashboardNav = () => {
  return (
    <div className="flex h-[100%] w-full bg-transparent items-center justify-between text-white">
      <div className="px-12">
        <img
          className="mix-blend-lighten"
          src="/FORKIT.png"
          alt=""
          height={100}
          width={100}
        />
      </div>
      <div className="flex items-center">
        <div className="px-5 lg:px-12">Home</div>
        <div className="px-5 lg:px-12">Marketplace</div>
        <div className="px-5 lg:px-12">Contact Us</div>
      </div>
    </div>
  );
}

export default DashboardNav
