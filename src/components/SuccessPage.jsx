import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Context/StateContext";
import logo from "../assets/logo.svg";
function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, accessToken } = location.state || {};
  const {
    setUserInfo,
    userInfo,

    clearDetectionData,
    
  } = useStateContext();
  if (!user || !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Invalid access
      </div>
    );
  }

  const handleClick = (token, id) => {
    clearDetectionData();
    console.log("id", id, "token", token);
    setUserInfo({ userId: id, token});
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ userId: id, token})
    );
    localStorage.setItem("DetectionData", JSON.stringify({}));
    navigate("/login", {
      state: {
        user: user,
        accessToken: token,
      },
    });
  };
  console.log(userInfo);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src={logo}
          alt="Solar Guard Logo"
          className="w-20 h-20 object-contain mx-auto"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Signup Successful!
        </h2>
        <p className="text-center text-gray-700 text-lg">
          Welcome,{" "}
          <span className="font-semibold text-yellow-600">{user.email}</span>
        </p>
        {/* <p className="text-center text-gray-700">
          Account created at:{" "}
          <span className="font-semibold">
            {new Date(user.createdAt).toLocaleString()}
          </span>
        </p> */}
        <p className="py-4 text-gray-800 text-center">
          Begin detecing those solar panel defects!
        </p>
        <div className="pt-4">
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleClick(accessToken, user.id)}
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
