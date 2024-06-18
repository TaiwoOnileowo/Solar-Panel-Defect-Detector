import React from 'react';
import logo from "../assets/logo.svg";
import bg_image from '../assets/bg_image.png';
import { useStateContext } from '../Context/StateContext';
const PleaseWait = () => {
  const {displayedWaitMessage} = useStateContext()
  return (
    <>
    <div className='absolute w-full flex items-center z-[1] justify-center h-full bg-blue-600 bg-opacity-40'>
    <img src={bg_image} alt="" />
  </div>
    <div
      className="absolute w-full h-full z-[10] "
    >
     
      <div className="bg-blue-700 h-1 loading rounded-full" />
      <div className="w-full h-full flex z-[10] flex-col items-center justify-center">
        <img src={logo} alt="" className="w-24 h-24 animate-pulse" />
        <h1 className="text-2xl font-bold uppercase animate-pulse text-[#4493D6]">
          Solar <span className="text-[#F5E212]">Guard</span>
        </h1>
        <h1 className="text-lg font-bold text-white">{displayedWaitMessage}</h1>
      </div>
    </div>
    </>
  );
}

export default PleaseWait;
