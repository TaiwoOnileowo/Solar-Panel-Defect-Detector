import React from "react";
import { useStateContext } from "../Context/StateContext";
import DetectionSetNames from "./DetectionSetNames";
import logo from "../assets/logo.svg";
const Sidebar = () => {
  const { setShow } = useStateContext();
  return (
    <div className="bg-blue-100 text-white  p-6 flex flex-col items-center">
      <div className="w-full pb-4 h-[8vh] ">
        <button
          className="bg-blue-700 hover:bg-blue-900  transition-all p-2 cursor-pointer rounded-full text-white text-center w-full "
          onClick={() => {
            setShow({
              welcome: false,
              detectionSet: false,
              uploadImage: true,
              gettingDetection: false,
            });
          }}
        >
          New Detection Set
        </button>
        <hr className="border-gray-300 w-full mt-4" />
      </div>
      <DetectionSetNames />
      <div className="h-[15vh] flex gap-2 items-center  w-full pb-4">
        <img src={logo} alt="" className="w-12 h-12 justify-start" />
        <h1 className="text-lg font-bold uppercase text-[#4493D6]">
          Solar <span className="text-[#F5E212]">Guard</span>
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
