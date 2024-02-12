import { Tabs, Row, Col, Form, Typography, Input, Button } from 'antd';
import { useState } from 'react';

const { Text } = Typography;
const { Item } = Form;
const { TabPane } = Tabs

function CreateNewPassword({ setShowPage, createNewPassword }) {
	const [linkSent, setLinkSent] = useState(false)
	const onFinish = (values) => {
		createNewPassword(values)
		setLinkSent(true)
	};

	return (
		<div>
			<Row justify="center" className="padding-bottom">
				<Tabs size="large" centered>
					<TabPane key="Create new password" tab="Create new password" />
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
							<Form name="nest-messages" className="container"
								onFinish={onFinish}
							>
								<div className="padding-bottom">
									<Text>
										Reset your password below
									</Text>
								</div>
								<Item
									name="password"
									rules={[
										{
											required: true,
											message: ' ',
										},
										{ min: 7 }
									]}
									hasFeedback
								>
									<Input.Password placeholder="Password" />
								</Item>
								<Item
									name="confirm"
									dependencies={['password']}
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please confirm your password!',
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve();
												}
												return Promise.reject(new Error('passwords not matched!'));
											}
										})
									]}
								>
									<Input.Password placeholder="Confirm password" />
								</Item>
								<Button type="primary" htmlType="submit" className="full-width">
									Reset Password
								</Button>
							</Form>
						</Col>
				}
			</Row>
		</div>
	)
}

export default CreateNewPassword