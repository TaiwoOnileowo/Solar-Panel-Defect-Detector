import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./components/SignUpPage";
import SuccessPage from "./components/SuccessPage";
import LoginPage from "./components/LoginPage";
import ImageDetector from "./components/ImageDetector";
const App = () => {
  return (
    <div className=" w-full ">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/sign-in-success" element={<SuccessPage />} />
          <Route path="/app" element={<ImageDetector />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      {/* <SignUp /> */}
    </div>
  );
};

export default App;
