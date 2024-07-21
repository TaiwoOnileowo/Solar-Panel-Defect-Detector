import React, { useState, createContext, useContext, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(localStorage.getItem("userInfo")) || []
  );
  const [detectionData, setDetectionData] = useState(
    () => JSON.parse(localStorage.getItem("Detection Data")) || []
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
  const [detectionStatus, setDetectionStatus] = useState({});

  const clearDetectionData = () => {
    setDetectionData([]);
    localStorage.removeItem("Detection Data");
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
        setDetectionData(userDetectionSets);
        localStorage.setItem(
          "Detection Data",
          JSON.stringify(userDetectionSets)
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
        
        clearUserInfo,
        detectionStatus,
        setDetectionStatus
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
