import { Space, Tabs, Row, Col, Form, Typography, Button } from 'antd';
import { useRef, useState } from 'react';

const { Text } = Typography;
const { TabPane } = Tabs

function VerificationSent({ setShowPage }) {

    return (
        <div>
            <Row justify="center" className="padding-bottom">
                <Tabs size="large" centered>
                    <TabPane key="verification" tab="Verification" />
                </Tabs>
            </Row>
            <Row justify="center" className="container">
                <Col>
                    <div className="padding-bottom">
                        <Text>
                            A verification link has been sent to your email address. Please click on the link to verify your email address. You can login once verified.
                        </Text>
                    </div>
                </Col>
                <Button onClick={() => setShowPage("login")} type="primary" htmlType="submit" className="mt-4 full-width">
                    Back to Login
                </Button>
                <Col style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                    <Text>
                        Did not recieve verification email?
                    </Text>
                    <a onClick={() => setShowPage("verification")} style={{
                        fontSize: "12px",
                        textAlign: "center",
                        color: "#1890FF",

                    }}>Send Again</a>
                </Col>
            </Row>
        </div>
    )
}

export default VerificationSent