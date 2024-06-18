import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Context/StateContext";
import logo from "../assets/logo.svg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setUserInfo,
    clearDetectionData,
    fetchDetectionSets,
    detectionData,
    userInfo,
  } = useStateContext();
  const navigate = useNavigate();

  const getInitialsFromEmail = (email) => {
    const namePart = email.split("@")[0];
    const parts = namePart.split(".");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return namePart[0].toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const raw = JSON.stringify({ email, password });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    };

    try {
      const response = await fetch(
        "https://pv-detection-be-f4e629996651.herokuapp.com/api/v1/auth/login",
        requestOptions
      );
      const result = await response.json();
      if (response.ok && result.status === "success") {
        const { id } = result.data.user;
        const accessToken = result.data.accessToken;
        const initials = getInitialsFromEmail(email);

        clearDetectionData();

        setUserInfo({
          userId: id,
          accessToken,
          email: email,
          initials,
        });

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userId: id,
            accessToken,

            initials,
          })
        );

        console.log("jjd");
        await fetchDetectionSets(accessToken, id);
        navigate("/app", {
          state: {
            user: result.data.user,
            accessToken: result.data.accessToken,
          },
        });
      } else {
        console.error(
          `Login failed: ${result.message || "An unknown error occurred"}`
        );
        alert(`Login failed: ${result.message || "An unknown error occurred"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (detectionData?.detectionSets) {
      navigate("/app");
      console.log("hh");
    }
  }, [detectionData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src={logo}
          alt="Solar Guard Logo"
          className="w-20 h-20 object-contain mx-auto"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <div className="text-sm text-center pt-4">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:text-blue-500">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
