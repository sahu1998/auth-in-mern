import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { getApiHandler } from "../apiHandler";
import { useNavigate } from "react-router-dom";
const MainLayout = ({ children }) => {
  const history = useNavigate();
  const authenticateUser = async () => {
    const token = localStorage.getItem("token");
    const isValidUser = await getApiHandler(`/auth/verify-user/${token}`);
    console.log("auth: ", isValidUser);
    if (!isValidUser.login) {
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      history("/signin");
    }
  };

  useEffect(() => {
    authenticateUser();

    // return () => {
    //   localStorage.removeItem("login");
    //   localStorage.removeItem("token");
    // };
  }, []);
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
