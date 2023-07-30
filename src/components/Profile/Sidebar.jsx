import { AiOutlineUser, AiOutlineHome, AiOutlineUpload } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="w-full h-[100%] flex gap-5 divide-y-[0.2px] flex-col py-5 px-2 text-white">
      <div className="w-full grid grid-cols-3">
        <div className="col-span-1 flex items-center justify-center">
          <div className="flex bg-gray-500 p-5 rounded-lg">
            <AiOutlineUser />
          </div>
        </div>
        <div className="p-3 col-span-2 flex items-center justify-start">
          Welcome,User
        </div>
      </div>
      <div className="menu flex items-center flex-col gap-5 p-5">
        <div className="w-full">
          <p className="font-outfit">Billing</p>
          <ul className="px-3 py-1 font-sans">
            <li>Overview</li>
            <li>Bank Details</li>
            <li>Billing History</li>
          </ul>
        </div>
        <div className="w-full">
          <p className="font-outfit">Status</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
