import React, { useEffect, useState } from "react";
import { useStateContext } from "../Context/StateContext";
import { FaCheckCircle } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DetectionSet = () => {
  const { detectionData, selectedDetectionSetId } = useStateContext();
  console.log(selectedDetectionSetId);
  console.log(detectionData);
  const [imageDimensions, setImageDimensions] = useState({});

  const selectedSet = detectionData?.find(
    (set) => set.id === selectedDetectionSetId
  );

  let displayedDefectSummary = [];
  let defectClassName;

  useEffect(() => {
    const selectedSet = detectionData?.find(
      (set) => set.id === selectedDetectionSetId
    );
    if (selectedSet) {
      setImageDimensions({});
      selectedSet?.images.forEach((image) => {
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
  }, [detectionData]);

  if (selectedSet?.report) {
    const defectSummary = selectedSet.report.defectSummary;
    for (const [defect, count] of Object.entries(defectSummary)) {
      displayedDefectSummary.push(
        <li className="text-sm" key={defect}>{`${defect}: ${count}`}</li>
      );
      console.log(displayedDefectSummary);
    }
  } else {
    console.log("No defect summary found for the given detection set.");
  }

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

  if (!selectedSet) {
    console.log(selectedDetectionSetId);
    console.log(detectionData);
    return <div className=" h-full w-full">Detection set not found</div>;
  }
  console.log(selectedSet);

  return (
    <div className="mt-0 pb-12">
      <h1 className="text-center text-sm font-bold text-gray-600 mb-6">
        Images Uploaded: {selectedSet?.images?.length}
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="flex items-center"
      >
        {selectedSet?.images?.map((image, index) => (
          <SwiperSlide key={index} className="h-[300px]">
            <div className="relative flex flex-col  gap-2 items-center">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className="text-center text-sm font-bold text-gray-600 mt-2">
        Image Predictions: {selectedSet.totalPredictedImages}
      </h1>
      <div className="flex gap-y-4 gap-x-4 py-10 flex-wrap justify-center">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {selectedSet?.images?.map((image, index) => (
            <SwiperSlide
              key={index}
              className={`relative flex ${
                defectClassName === "black_core"
                  ? "h-[480px] w-full"
                  : "h-[380px]"
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
                        className="absolute text-white px-1"
                        style={{
                          top: `${
                            ((defect.y - defect.h / 2) /
                              imageDimensions[image.id].height) *
                            100
                          }%`,
                          left: `${
                            ((defect.x - defect.w / 2) /
                              imageDimensions[image.id].width) *
                            100
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
                            ((defect.y - defect.h / 2) /
                              imageDimensions[image.id].height) *
                            100
                          }%`,
                          left: `${
                            ((defect.x - defect.w / 2) /
                              imageDimensions[image.id].width) *
                            100
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
        <div className="flex flex-col gap-2 justify-center">
          {!selectedSet?.report ? (
            <>
              <h1 className="text-lg font-bold text-gray-600">
                Detection Report not available for this Detection Set
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-center text-sm font-bold text-gray-600">
                Defects Summary
              </h1>
              <p className="text-lg mt-10 font-bold">
                Total Defects: {selectedSet?.report?.totalDefects}{" "}
              </p>
              <p className="">Defects Class: </p>
              <ul className="list-disc list-inside pt-2">
                {displayedDefectSummary}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectionSet;
