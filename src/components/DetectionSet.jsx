import React, { useEffect, useState } from "react";
import { useStateContext } from "../Context/StateContext";
import { FaCheckCircle } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DetectionSet = () => {
  const {
    detectionData,
    selectedDetectionSetId,
    detectionData: { detectionSetImages },
  } = useStateContext();
  const [imageDimensions, setImageDimensions] = useState({});
  const mappedDetectionSetImages = detectionSetImages.map(
    (setImage) => setImage
  );
  const setDetected = detectionData.detectionSets.find(
    (set) => set.id === selectedDetectionSetId
  );
  let displayedDefectSummary;

  if (setDetected && setDetected?.report?.defectSummary) {
    const defectSummary = setDetected?.report?.defectSummary;

    for (const [defect, count] of Object.entries(defectSummary)) {
      // console.log(`${defect}: ${count}`);
      displayedDefectSummary = (
        <li className="text-sm">{`${defect}: ${count}`}</li>
      );
    }
  } else {
    console.log("No defect summary found for the given detection set.");
  }

  useEffect(() => {
    const selectedSet = mappedDetectionSetImages.find(
      (set) => set.detectionId === selectedDetectionSetId
    );
    if (selectedSet) {
      setImageDimensions({});
      selectedSet.images.forEach((image) => {
        const img = new Image();
        img.src = image.imageUrl;
        img.onload = () => {
          setImageDimensions((prevDimensions) => ({
            ...prevDimensions,
            [image.id]: { width: img.naturalWidth, height: img.naturalHeight },
          }));
        };
      });
    }
  }, [detectionSetImages, detectionData.detectionSets]);
  let defectClassName;
  const getColor = (defectClass) => {
    defectClassName = defectClass;
    switch (defectClass) {
      case "finger":
        return "yellow";
      case "crack":
        return "orange";
      case "thick_line":
        return "green";
      case "black_core":
        return "red";
      default:
        return "green";
    }
  };

  if (!detectionSetImages || !detectionSetImages.length) {
    return <div>No detection set selected</div>;
  }

  const selectedSet = mappedDetectionSetImages.find(
    (set) => set.detectionId === selectedDetectionSetId
  );

  if (!selectedSet) {
    return <div>Selected detection set not found</div>;
  }
  if (selectedSet.images === null) {
    return <div className="w-full h-screen text-2xl font-bold ">Please Wait...</div>;
  }
  console.log(selectedSet.images)
  return (
    <div className="mt-0 pb-12">
      <h1 className="text-center text-sm font-bold text-gray-600 mb-6">
        Images Uploaded: {selectedSet.images.length}
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="flex items-center"
      >
        {selectedSet.images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="relative flex flex-col gap-2 items-center"
          >
            <img
              src={image.imageUrl}
              alt={image.originalFilename}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <span className="text-sm">{image.originalFilename}</span>
            <div className="absolute top-0 left-0 w-full h-full  flex items-center justify-center rounded-lg">
              <div className="flex items-center gap-2 text-lg font-bold text-blue-800">
                Done <FaCheckCircle />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className="text-center text-sm font-bold text-gray-600 mt-12">
        Image Predictions: {setDetected.totalPredictedImages}
      </h1>
      <div className="flex gap-y-4 gap-x-4 py-10 flex-wrap justify-center">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {selectedSet.images.map((image, index) => (
            <SwiperSlide
              key={index}
              className={`relative flex ${
                defectClassName === "black_core" ? "h-[500px] w-full" : null
              }  flex-col gap-2 items-center`}
            >
              <div className="relative">
                <img
                  src={image.imageUrl}
                  alt={image.originalFilename}
                  className="w-[400px] h-[300px] object-cover rounded-lg"
                />
                {imageDimensions[image.id] &&
                  image.defectPredictions.map((defect, defectIndex) => (
                    <React.Fragment key={defectIndex}>
                      <div
                        className="absolute  text-white px-1"
                        style={{
                          top: `${
                            (defect.y / imageDimensions[image.id].height) * 100
                          }%`,
                          left: `${
                            (defect.x / imageDimensions[image.id].width) * 100
                          }%`,
                          transform: "translateY(-100%)",
                          background: getColor(defect.class),
                        }}
                      >
                        {defect.class}
                      </div>
                      <div
                        className="absolute border-2"
                        style={{
                          top: `${
                            (defect.y / imageDimensions[image.id].height) * 100
                          }%`,
                          left: `${
                            (defect.x / imageDimensions[image.id].width) * 100
                          }%`,
                          width: `${
                            (defect.w / imageDimensions[image.id].width) * 100
                          }%`,
                          height: `${
                            (defect.h / imageDimensions[image.id].height) * 100
                          }%`,
                          borderColor: getColor(defect.class),
                        }}
                      ></div>
                    </React.Fragment>
                  ))}
              </div>

              <span className="text-sm">{image.originalFilename}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col w-full px-8">
        <h1 className="text-center text-sm font-bold text-gray-600">
          Defects Summary
        </h1>
        <p className="text-lg font-bold">
          Total Defects: {setDetected?.report?.totalDefects}{" "}
        </p>
        <p className="">Defects Class: </p>
        <ul className="list-disc list-inside pt-2">{displayedDefectSummary}</ul>
      </div>
    </div>
  );
};

export default DetectionSet;
