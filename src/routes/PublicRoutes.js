// PublicRoutes.js
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { getAccount } from "../services/api";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import UserLayout from "../layout/UserLayout";
import LoginSignup from "../pages/Auth/LoginSignup";
import Welcome from "../pages/Auth";
import Dashboard from "../pages/Admin/Dashboard";
import AdminLayout from "../layout/AdminLayout";

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const PublicRoute = ({ component: Component, ...rest }) => {
  // State to track the authentication status and loading state
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to check authentication status
    const token = localStorage.getItem("token");
    const checkAuthentication = async () => {
      // try {
      //   if (token) {
      //     const { data, status } = await getAccount(token);
      //     if (status === 200) {
      //       setAuthenticated(false);
      //     } else {
      //       setAuthenticated(true);
      //     }
      //   } else {
      //     setAuthenticated(true);
      //   }
      // } catch (error) {
      //   console.log({ error });
      //   setAuthenticated(true);
      // } finally {
      //   // Set loading to true after authentication check is done
      //   setLoading(false);
      // }
    };

    // checkAuthentication();
  }, []); // Empty dependency array to run the effect only once

  if (loading) {
    // Show loading indicator or some placeholder while checking authentication
    return (
      <div
        style={{ height: "100vh" }}
        className="flex justify-center items-center w-full"
      >
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return authenticated ? <Component {...rest} /> : <Navigate to="/" replace />;
};

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout ><PublicRoute component={Home} /></UserLayout>} />
        <Route path="/home" element={<UserLayout ><PublicRoute component={Home} /></UserLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/auth" element={<Welcome />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
