import React, { useState } from "react";
import { useStateContext } from "../Context/StateContext";
const NameSet = () => {
  const { setUploadImage, setDetectionSets, detectionSets } = useStateContext();
  const [input, setInput] = useState();
  const handleSubmit = (e) => {
    setUploadImage(true);
  
    setInput("");
  };

  return (
    <div className="flex flex-col gap-4 w-[80%]">
      <h3 className="text-xl mt-8"> Give it a name</h3>
      <input
        name="name"
        type="text"
        className="border-2 border-gray-400 block  p-2 w-[50%] rounded-md"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          console.log(e.target.value);
        }}
      />
      <div className="w-[50%] flex justify-end">
        <button
          type="submit"
          className="bg-blue-800 text-white px-8 py-2 rounded-full flex"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NameSet;
