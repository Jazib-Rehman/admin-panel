import { Space, Tabs, Row, Col, Form, Typography, Button } from 'antd';
import { useRef, useState } from 'react';

const { Text } = Typography;
const { TabPane } = Tabs

function Verification() {
  const [OTP, setOTP] = useState(['', '', '', '']);
  const otpRef1 = useRef(null);
  const otpRef2 = useRef(null);
  const otpRef3 = useRef(null);
  const otpRef4 = useRef(null);

  const onFinish = (values) => {
    console.log(values);
  };

  const handleOTP = (i, e) => {
    if (i === 0) {
      setOTP([(OTP[0] = e.target.value), OTP[1], OTP[2], OTP[3]]);
      otpRef2.current.focus();
    } else if (i === 1) {
      otpRef3.current.focus();
      setOTP([OTP[0], (OTP[1] = e.target.value), OTP[2], OTP[3]]);
    } else if (i === 2) {
      otpRef4.current.focus();
      setOTP([OTP[0], OTP[1], (OTP[2] = e.target.value), OTP[3]]);
    } else if (i === 3) {
      setOTP([OTP[0], OTP[1], OTP[2], (OTP[3] = e.target.value)]);
    }
  };

  return (
    <div>
      <Row justify="center" className="padding-bottom">
        <Tabs size="large" centered>
          <TabPane key="verification" tab="Verification" />
        </Tabs>
      </Row>
      <Row className="container">
        <Col>
          <Form onFinish={onFinish}>
            <div className="padding-bottom">
              <Text>
                You will get a One-time password via the email you mentioned.
              </Text>
            </div>
            <Row align="center">
              <Space>
                <Col>
                  <div className="verifyCode">
                    <input
                      ref={otpRef1}
                      value={OTP[0]}
                      onChange={(e) => handleOTP(0, e)}
                      type="text"
                      placeholder="0"
                      className="OTP"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="verifyCode">
                    <input
                      ref={otpRef2}
                      value={OTP[1]}
                      onChange={(e) => handleOTP(1, e)}
                      type="text"
                      placeholder="0"
                      className="OTP"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="verifyCode">
                    <input
                      ref={otpRef3}
                      value={OTP[2]}
                      onChange={(e) => handleOTP(2, e)}
                      type="text"
                      placeholder="0"
                      className="OTP"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="verifyCode">
                    <input
                      ref={otpRef4}
                      value={OTP[3]}
                      onChange={(e) => handleOTP(3, e)}
                      type="text"
                      placeholder="0"
                      className="OTP"
                    />
                  </div>
                </Col>
              </Space>
            </Row>
            <br />
            <div className="padding-bottom">
              <Button type="primary" htmlType="submit" className="full-width">
                Verify
              </Button>
            </div>
            <Text style={{ fontSize: 12, color: '#00474F' }}>
              <Space>
                Did not recieve verification OTP?
                <a href="#">Send again</a>
              </Space>
            </Text>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Verification