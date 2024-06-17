import React from "react";
import Sidebar from "./SideBar";
import DetectionLayer from "./DetectionLayer";
import { useStateContext } from "../Context/StateContext";
import PleaseWait from "./PleaseWait";
const ImageDetector = () => {
const { show } = useStateContext();
  return (
    <div className="grid relative bg-[#F7F7F7] overflow-y-hidden h-screen">
      <Sidebar />
      <DetectionLayer />
      {show.pleasewait && <PleaseWait />}
    </div>
  );
};

export default ImageDetector;
