import React, { useRef, useEffect, useState } from "react";
import { useStateContext } from "../Context/StateContext";

const DetectionSetNames = () => {
  const {
    detectionData,
    setShow,
    setSelectedDetectionSetId,
    selectedDetectionSetId,
    // fetchDetectionImages,
  } = useStateContext();

  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setIsOverflowing(
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      );
    }
  }, [detectionData]);

  const handleClick = (id) => {

    setSelectedDetectionSetId(id);
   
    setShow({
      welcome: false,
      detectionSet: true,
      uploadImage: false,
      gettingDetection: false,
    });
  };
  
  return (
    <div
      ref={containerRef}
      className={`px-4 ${
        isOverflowing ? "" : "hide-scrollbar"
      } text-black w-full h-[75vh] mt-4 overflow-y-scroll`}
    >
      <ul className="flex flex-col gap-2">
        {detectionData?.map((set) => (
          <li
            key={set.id}
            onClick={() => handleClick(set.id)}
            className={`w-full ${
              selectedDetectionSetId === set.id ? "bg-gray-100" : null
            } rounded-md p-2 px-6 cursor-pointer hover:bg-gray-100 flex`}
          >
            {set.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetectionSetNames;
