import React from "react";
import { useStateContext } from "../Context/StateContext";
import { FaCheckCircle } from "react-icons/fa";
import Swal from 'sweetalert2'

const GettingDetectionSets = () => {
  const { detectionStatus, uploadedImages  } = useStateContext();

  return (
    <div className="flex gap-x-4 gap-y-8 mt-8 w-full relative flex-wrap items-center justify-center">
      {uploadedImages.map((file, index) => (
        <div key={index} className="relative flex flex-col gap-2 items-center">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-[300px] h-[200px] object-cover rounded-lg"
          />
          <span className="text-sm">{file.name}</span>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-lg">
            {detectionStatus[file.name] === "detecting" ? (
              <div className="overlay">
                <div className="text-lg font-bold text-gray-700">
                  Detecting<span className="dots" />
                </div>
              </div>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-2 text-lg font-bold text-green-700">
                  Done<FaCheckCircle />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      {}
     
    </div>
  );
};

export default GettingDetectionSets;
