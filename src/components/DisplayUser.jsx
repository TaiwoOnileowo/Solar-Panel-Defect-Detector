import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { useStateContext } from "../Context/StateContext";
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DisplayUser = () => {
  const { firstName, lastName, userInfo, clearUserInfo, clearDetectionData } = useStateContext();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleInfoClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleUserClick = () => {
    setUserPopupVisible(!isUserPopupVisible);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".info-icon, .popup")) {
      setPopupVisible(false);
    }
    if (!e.target.closest(".user-popup, .user-div")) {
      setUserPopupVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    clearUserInfo();
    clearDetectionData();
    navigate("/login");
  };

  return (
    <div className="relative bg-white w-[38%] h-fit box-shadow rounded-full p-[6px] px-2 flex items-center gap-2">
      <div className="relative cursor-pointer flex items-center bg-[#f4f7fe] rounded-full justify-center gap-1 ">
        <FaSearch size={12} className="absolute left-[5%] text-gray-700" />
        <input
          type="search"
          className="bg-[#f4f7fe] p-2 ml-6 rounded-full outline-none text-gray-500"
          placeholder="Search..."
        />
      </div>
      <div className={`popup ${isPopupVisible ? "show" : ""}`}>
        <h1 className="text-sm text-gray-800">
          Get started by simply uploading your images, the detection process
          starts, and you get your detection set result
        </h1>
      </div>

      <MdInfoOutline
        className="info-icon cursor-pointer text-gray-600"
        onClick={handleInfoClick}
      />
      <IoMoon className="cursor-pointer text-gray-600" />
      <div className={`user-popup ${isUserPopupVisible ? "show" : ""} text-lg `}>
        <h1 className=" text-gray-800 text-sm">👋 Hey, {userInfo?.email}</h1>
        <hr className="w-full border-gray-400 rounded-full  my-2 mb-4" />
        <div className="w-full flex items-center justify-between ">
          <h1 className="text-gray-800">Logout</h1>
          <IoIosLogOut className="text-blue-500 cursor-pointer" size={25} onClick={handleLogout} />
        </div>
      </div>
      <div
        className="text-white user-div cursor-pointer rounded-full w-10 flex items-center justify-center h-10 bg-blue-600"
        onClick={handleUserClick}
      >
        <h1 className="font-bold">
          { userInfo?.initials}
        </h1>
      </div>
    </div>
  );
};

export default DisplayUser;
