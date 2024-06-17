import React from "react";
import NameSet from "./NameSet";
import { useStateContext } from "../Context/StateContext";
import GettingDetectionSets from "./GettingDetectionSets";
import UploadImage from "./UploadImage";
const CreateDetectionSet = () => {
  const { show } = useStateContext();
  
  return (
    <>
      {/* {newSet && !uploadImage && <NameSet />} */}
      {!show.gettingDetection && <UploadImage />}
      {show.gettingDetection && <GettingDetectionSets />}
    </>
  );
};

export default CreateDetectionSet;
