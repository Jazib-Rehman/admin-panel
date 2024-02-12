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
      <Row>
        <Col className="left-side" span={isMobile ? 24 : 12}>
          <Row className="logo-container">
            <div className="logo">
              <img src="assets/logo.svg" alt="sabhi" className="light" />
              <img src="assets/sabhi.svg" alt="sabhi" />
            </div>
          </Row>
          <Row>
            <Col
              className="back-container"
              onClick={() => backHandler(showPage)}
            >
              {showPage !== "login" && (
                <>
                  <img src="assets/back.svg" alt="back" />
                  <Text className="back-text">Back</Text>
                </>
              )}
            </Col>
          </Row>

          {showPage === "forgotPassword" && (
            <Row justify="center">
              <ForgetPassword
                resetPassword={forgetPassword}
                setShowPage={setShowPage}
              />
            </Row>
          )}
          {showPage === "login" && (
            <Row justify="center">
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
            <Row justify="center">
              <Verification setShowPage={setShowPage} />
            </Row>
          )}
          {showPage === "create-new-password" && (
            <Row justify="center">
              <CreateNewPassword
                createNewPassword={createNewPassword}
                setShowPage={setShowPage}
              />
            </Row>
          )}
          {showPage === "congratulations" && (
            <Row justify="center">
              <Congratulations setShowPage={setShowPage} />
            </Row>
          )}
          {showPage === "verificationSent" && (
            <Row justify="center">
              <VerificationSent setShowPage={setShowPage} />
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col align="center" justify="center" className="right-side" span={12}>
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
