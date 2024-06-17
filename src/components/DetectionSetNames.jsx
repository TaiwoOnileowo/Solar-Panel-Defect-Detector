import React from "react";
import { useStateContext } from "../Context/StateContext";

const DetectionSetNames = () => {
  const {
    detectionData: { detectionSets },
    setShow,
    setSelectedDetectionSetId,
    selectedDetectionSetId,
  } = useStateContext();

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
    <div className="px-4 overflow-y-scroll text-black w-full h-[75vh] pt-4">
      <ul className="flex flex-col gap-2">
        {detectionSets?.map((set) => (
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
