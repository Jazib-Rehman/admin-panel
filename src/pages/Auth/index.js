import React, { useContext, useEffect, useState } from "react";
import "./welcome.less";
import ForgetPassword from "./ForgetPassword";
import LoginSignup from "./LoginSignup";
import Verification from "./Verification";
import CreateNewPassword from "./CreateNewPassword";
import Congratulations from "./Congratulation";

import { Row, Col, Typography, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/Auth";
import { StyledLoader } from "../../components/loader";
import { isMobile } from "react-device-detect";
import VerificationSent from "./verificationSent";

const { Text } = Typography;

export default function Welcome(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPage, setShowPage] = useState("login");
  const [type, setType] = useState("login");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [userId, setUserId] = useState("");

  const { from } = location.state || { from: { pathname: "/dashboard" } };

  const login = (data) => {
    setLoading(true);
    // navigate("/")
    auth.signIn(
      data,
      () => navigate(from),
      () => setLoading(false)
    );
  };

  const signup = async (values) => {
    if (values.tnc) {
      setLoading(true);
      try {
        console.log({ values });
        navigate("/")
      } catch (error) {
        setLoading(false);
        console.log({ error });
      }
    } else {
      message.error("Please accept terms and conditions!");
    }
  };

  const forgetPassword = async (value) => {
    setLoading(true);
    try {
      console.log({ value });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createNewPassword = async (value) => {
    setLoading(true);
    try {
      const updateValues = {
        ...value,
        email: email,
      };
      console.log({ updateValues });
      setShowPage("login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const backHandler = (key) => {
    switch (key) {
      case "forgotPassword":
        setShowPage("login");
        break;
      case "verification":
        setShowPage("login");
        break;
      case "create-new-password":
        setShowPage("forgotPassword");
        break;
      case "congratulations":
        setShowPage("login");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {loading && <StyledLoader />}
      <Row className="h-screen items-center">
        <Col style={{ background: "#1D6E7130" }} className="h-screen flex items-center justify-center" span={isMobile ? 24 : 12}>
          <div className="w-1/2">
            <Row>
              <Col
                className="cursor-pointer"
                onClick={() => backHandler(showPage)}
              >
                {showPage !== "login" && (
                  <div className="w-12 flex items-center justify-between">
                    <img src="assets/back.svg" alt="back" />
                    <Text className="back-text">Back</Text>
                  </div>
                )}
              </Col>
            </Row>

            {showPage === "forgotPassword" && (
              <Row className="w-full" justify="center">
                <ForgetPassword
                  resetPassword={forgetPassword}
                  setShowPage={setShowPage}
                />
              </Row>
            )}
            {showPage === "login" && (
              <Row className="w-full" justify="center">
                <LoginSignup
                  type={type}
                  setType={setType}
                  setShowPage={setShowPage}
                  login={login}
                  signup={signup}
                  company={company}
                  email={email}
                />
              </Row>
            )}
            {showPage === "verification" && (
              <Row className="w-full" justify="center">
                <Verification setShowPage={setShowPage} />
              </Row>
            )}
            {showPage === "create-new-password" && (
              <Row className="w-full" justify="center">
                <CreateNewPassword
                  createNewPassword={createNewPassword}
                  setShowPage={setShowPage}
                />
              </Row>
            )}
            {showPage === "congratulations" && (
              <Row className="w-full" justify="center">
                <Congratulations setShowPage={setShowPage} />
              </Row>
            )}
            {showPage === "verificationSent" && (
              <Row className="w-full" justify="center">
                <VerificationSent setShowPage={setShowPage} />
              </Row>
            )}
          </div>
        </Col>
        {!isMobile && (
          <Col align="center" justify="center" className="h-screen flex items-center" span={12}>
            {showPage === "forgotPassword" ? (
              <img src="assets/rafiki2.svg" alt="sabhi" />
            ) : (
              <img src="assets/rafiki.svg" alt="sabhi" />
            )}
          </Col>
        )}
      </Row>
    </div>
  );
}
