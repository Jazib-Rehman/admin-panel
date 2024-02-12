import { Tabs, Row, Col, Form, Typography, Input, Button } from 'antd';
import { useState } from 'react';

const { Text } = Typography;
const { Item } = Form;
const { TabPane } = Tabs


const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} not valid!',
	}
};

function ForgetPassword({ setShowPage, resetPassword }) {
	const [linkSent, setLinkSent] = useState(false)
	const onFinish = (values) => {
		resetPassword(values)
		setLinkSent(true)
	};

	return (
		<div>
			<Row justify="center" className="padding-bottom">
				<Tabs size="large" centered>
					<TabPane key="Reset password" tab="Reset password" />
				</Tabs>
			</Row>
			<Row className="container">
				{
					linkSent ?
						<Col>
							<div className="padding-bottom">
								<Text>
									A password reset link has been sent to your email address. Please click on the link to reset your password.
								</Text>
							</div>

							<Button type="primary" onClick={() => setShowPage("login")} className="full-width">
								Back to Login
							</Button>
							<Col style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
								<Text>
									Did not recieve email?
								</Text>
								<a onClick={() => setLinkSent(false)} style={{
									fontSize: "12px",
									textAlign: "center",
									color: "#1890FF",

								}}>Send Again</a>
							</Col>
						</Col>
						:
						<Col>
							<Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
								<div className="padding-bottom">
									<Text>
										Enter your registered email below to recieve password reset instructions
									</Text>
								</div>
								<Item
									name={['email']}
									rules={[{ type: 'email' }]}
								>
									<Input placeholder="Enter here" />
								</Item>
								<Button type="primary" htmlType="submit" className="full-width">
									Send
								</Button>
							</Form>
						</Col>
				}
			</Row>
		</div>
	)
}

export default ForgetPassword