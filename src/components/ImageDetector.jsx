import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import DetectionLayer from "./DetectionLayer";
import { useStateContext } from "../Context/StateContext";
import { useNavigate } from "react-router-dom";
import PleaseWait from "./PleaseWait";

const ImageDetector = () => {
  const { show, userInfo } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.accessToken) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div className="grid relative bg-[#F7F7F7] overflow-y-hidden h-screen">
      <Sidebar />
      <DetectionLayer />
      {show.pleasewait && <PleaseWait />}
    </div>
  );
};

export default ImageDetector;
