import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(localStorage.getItem("userInfo")) || []
  );
  const [detectionData, setDetectionData] = useState(
    () => JSON.parse(localStorage.getItem("detectionData")) || {}
  );
  const [show, setShow] = useState({
    welcome: true,
    detectionSet: false,
    gettingDetection: false,
    pleasewait: false,
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedDetectionSetId, setSelectedDetectionSetId] = useState(null);
  const [displayedWaitMessage, setDisplayedWaitMessage] = useState("");

  const clearDetectionData = () => {
    setDetectionData({});
    localStorage.removeItem("detectionData");
    console.log("removed");
  };
  useEffect(() => {
    if (!userInfo.accessToken) return;
  }, []);
  const fetchDetectionSets = async (accessToken, userId) => {
    if (!accessToken) return;

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        "https://pv-detection-be-f4e629996651.herokuapp.com/api/v1/detection-sets/",
        requestOptions
      );
      const result = await response.json();

      if (result.status === "success") {
        const userDetectionSets = result.data.detectionSets.filter(
          (set) => set.userId === userId
        );
        setDetectionData((prevData) => ({
          detectionSets: userDetectionSets,
          ...prevData,
        }));
        localStorage.setItem(
          "detectionData",
          JSON.stringify({
            detectionSets: userDetectionSets,
            ...detectionData,
          })
        );
      } else {
        console.error("Failed to fetch detection sets:", result.message);
      }
    } catch (error) {
      console.error("Error fetching detection sets:", error);
    }
  };

  useEffect(() => {
    if (userInfo.accessToken && userInfo.userId) {
      fetchDetectionSets(userInfo.accessToken, userInfo.userId);
    }
  }, [userInfo]);

  const fetchDetectionImages = async (setId) => {
    if (!setId) return;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userInfo.accessToken}`);

    try {
      const response = await fetch(
        `https://pv-detection-be-f4e629996651.herokuapp.com/api/v1/detection-sets/${setId}/images`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );
      const result = await response.json();
      if (result.status !== "success") {
        throw new Error(
          "Failed to fetch detection set images: " + result.message
        );
      }

      const newImages = result.data.images;
      console.log(newImages);

      const newDetectionSetEntry = { images: newImages, detectionId: setId };

      setDetectionData((prevData) => {
        const newDetectionSetImages =
          prevData.detectionSetImages && prevData.detectionSetImages.length > 0
            ? [...prevData.detectionSetImages, newDetectionSetEntry]
            : [newDetectionSetEntry];

        localStorage.setItem(
          "detectionData",
          JSON.stringify({
            ...prevData,
            detectionSetImages: newDetectionSetImages,
          })
        );

        return {
          ...prevData,
          detectionSetImages: newDetectionSetImages,
        };
      });
    } catch (error) {
      console.error("Error fetching detection set images:", error);
    }
  };

  const clearUserInfo = () => {
    setUserInfo({});
    localStorage.removeItem("userInfo");
  };
  console.log(userInfo);
  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        selectedDetectionSetId,
        setSelectedDetectionSetId,
        detectionData,
        setDetectionData,
        uploadedImages,
        setUploadedImages,
        show,
        setShow,
        displayedWaitMessage,
        setDisplayedWaitMessage,
        clearDetectionData,
        fetchDetectionSets,
        fetchDetectionImages,
        clearUserInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
