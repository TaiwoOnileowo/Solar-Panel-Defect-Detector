import React, {useState} from "react";
import { useStateContext } from "../Context/StateContext";
import logo from "../assets/logo.svg";
import solarimage from "../assets/solarimage.jpg";
import detectedsolarimage from "../assets/solarimagedetect.png";
import { FaCheckCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
const Welcome = () => {
  const { setShow } = useStateContext();
  const [showRight, setShowRight] = useState(false);
  return (
    <div className="h-full pt-4 flex flex-col items-center">
      <img src={logo} alt="" className="w-24 h-24" />
      <h1 className="text-2xl font-bold uppercase text-[#4493D6]">
        Solar <span className="text-[#F5E212]">Guard</span>
      </h1>
      <p className="text-lg mt-4 text-blue-600">
        Your premier solution for detecting and identifying defects in solar
        panels
      </p>
      <div className="flex gap-12 mt-8">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-lg font-medium text-blue-300 mx-auto">
            Solar Image
          </h2>
          <img src={solarimage} alt="" className="w-36 h-32 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-lg font-medium text-blue-300 mx-auto inline-flex gap-2 items-center">
            Defects Detected <FaCheckCircle />
          </h2>
          <img
            src={detectedsolarimage}
            alt=""
            className="w-36 h-32 rounded-lg"
          />
        </div>
      </div>
      <div className="w-full items-center justify-center flex mt-10">
        <button
          className="bg-blue-700 px-4 inline-flex items-center gap-2 justify-center mt-8 font-bold text-base hover:bg-blue-900 transition-all duration-300  py-2 text-white rounded-full"
          onClick={() => {
            setShow({
              welcome: false,
              detectionSet: false,
              uploadImage: true,
              gettingDetection: false,
            });
          }}
          onMouseEnter={() => setShowRight(true)}
          onMouseLeave={() => setShowRight(false)}
        >
          Create A Detection Set <FaAngleRight size={18} className={`${showRight ? "inline-block" : "hidden"}`} />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
