import React, { useRef, useEffect, useState } from "react";
import { useStateContext } from "../Context/StateContext";

const UploadImage = () => {
  const {
    setDetectionData,
    detectionData,
    setDetectionSet,
    userInfo,
    setShow,
    uploadedImages,
    setUploadedImages,
    setSelectedDetectionSetId,
    setDisplayedWaitMessage,
    setDetectionStatus,
  } = useStateContext();

  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef(null);
  let imageStatus;
  useEffect(() => {
    if (containerRef.current) {
      setIsOverflowing(
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      );
    }
  }, [uploadedImages]);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    setDetectionStatus((prevStatus) => {
      const newStatus = files.reduce(
        (acc, file) => ({
          ...acc,
          [file.name]: "detecting",
        }),
        prevStatus
      );
      return newStatus;
    });
    setUploadedImages((prevData) => {
      return [...prevData, ...files];
    });
  };

  const createDetectionSet = async () => {
    setDisplayedWaitMessage("Creating detection set...");
    const formData = new FormData();
    uploadedImages.forEach((file) => {
      formData.append("images", file);
    });
    const accessToken = userInfo.accessToken;

    const response = await fetch(
      "https://pv-detection-be-f4e629996651.herokuapp.com/api/v1/detection-sets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );
    const result = await response.json();
    if (!response.ok || result.status !== "success") {
      throw new Error(result.message || "An unknown error occurred");
    }
    setDisplayedWaitMessage("Detection Set Created");
    fetchDetectionResults(result.data.detectionSet.id);
  };

  const fetchDetectionResults = async (setId) => {
    if (!setId) return;
    setDisplayedWaitMessage("Fetching detection results...");
    setSelectedDetectionSetId(setId);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userInfo.accessToken}`);

    try {
      const response = await fetch(
        `https://pv-detection-be-f4e629996651.herokuapp.com/api/v1/detection-sets/${setId}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );
      const result = await response.json();
      if (result.status !== "success") {
        fetchDetectionResults(setId);
        throw new Error(
          "Failed to fetch detection set images: " + result.message
        );
      }

      if (result.data.detectionSet.status === "pending") {
        fetchDetectionResults(setId);
        console.log(result.data.detectionSet);
        console.log("repolling");
      } else {
        setDisplayedWaitMessage("Done");
        const newDataset = result.data.detectionSet;
        // setDetectionSet((prevData) => {
        //   const newEntry = prevData ? [...prevData, newDataset] : [newDataset];
        //   localStorage.setItem("Detection Sets", JSON.stringify(newEntry));
        //   return newEntry;
        // });
        setDetectionData((prevData) => {
          const newEntry = prevData ? [newDataset,...prevData ] : [newDataset];
          localStorage.setItem("Detection Data", JSON.stringify(newEntry));
          return newEntry;
        })
        setDetectionStatus((prevStatus)=>{
          const newStatus = uploadedImages.reduce(
            (acc, file) => ({
              ...acc,
              [file.name]: "done",
            }),
            prevStatus
          );
          return newStatus;
        })
        setUploadedImages([]);
        setShow({
          welcome: false,
          detectionSet: true,
          uploadImage: false,
          gettingDetection: false,
          pleasewait: false,
        });
      }
    } catch (error) {
      console.error("Error fetching detection set images:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShow({
      welcome: false,
      detectionSet: false,
      uploadImage: true,
      gettingDetection: true,
      pleasewait: true,
    });
    createDetectionSet();
  };

  return (
    <div className="h-full w-full flex gap-4 flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="bg-white box-shadow flex flex-col items-center justify-center gap-8 rounded-xl shadow-black p-8">
          <h1 className="text-3xl text-blue-600 font-bold w-[400px] text-center">
            Upload Images to create a new Detection Set
          </h1>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            id="upload-input"
          />
          <label
            htmlFor="upload-input"
            className="bg-blue-700 transition-all hover:bg-blue-900 text-white rounded-full text-center py-3 w-[200px] cursor-pointer"
          >
            Upload Image
          </label>
        </div>
        {uploadedImages.length > 0 && (
          <>
            <div
              ref={containerRef}
              className={`h-[300px] ${
                isOverflowing ? "" : "hide-scrollbar"
              } mt-4 flex flex-col overflow-y-scroll`}
            >
              {uploadedImages.map((file, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-start my-2"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <span className="t">{file.name}</span>
                </div>
              ))}
            </div>
            <div className="z-[10] flex justify-end w-full mb-6">
              <button
                className="text-white bg-blue-700 hover:bg-blue-900 w-[150px] py-2 rounded-full"
                type="submit"
              >
                Start Detection
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UploadImage;
