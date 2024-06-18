import React from "react";
import Welcome from "./Welcome";
import { useStateContext } from "../Context/StateContext";
import DetectionSet from "./DetectionSet";
import CreateDetectionSet from "./CreateDetectionSet";
import DisplayUser from "./DisplayUser";

const DetectionLayer = () => {
  const { show } = useStateContext();

  return (
    <div className="px-8 h-screen overflow-hidden py-6 scrollbar">
      <div className="h-[10%] flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase text-[#4493D6]">
          Solar <span className="text-[#F5E212]">Guard</span>
        </h1>
        <DisplayUser/>
      </div>
      <div className="h-[90%]">
        {show.welcome &&
          !show.detectionSet &&
          !show.uploadImage &&
          !show.gettingDetection && <Welcome />}
        {show.uploadImage && !show.welcome && !show.detectionSet && (
          <CreateDetectionSet />
        )}
        {show.detectionSet &&
          !show.uploadImage &&
          !show.welcome &&
          !show.gettingDetection && <DetectionSet />}
      </div>
    </div>
  );
};

export default DetectionLayer;
