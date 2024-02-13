import { useEffect, useState } from "react";

import {
  Tabs,
  Col,
  Form,
  Input,
  Typography,
  Select,
  Checkbox,
  Button,
} from "antd";

const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;

const prefixSelector = (
  <Item name="prefix" noStyle>
    <Select defaultValue="+92" style={{ width: 70 }}>
      <Option value="92">+92</Option>
    </Select>
  </Item>
);

function LoginSignup({
  login,
  signup,
  setShowPage,
  type,
  setType,
  company,
  email,
}) {
  const [phoneNumber, setPhoneNumber] = useState("afasfa");

  // const PHONE_REGEX = /^(?:\d{8}(?:\d{2}(?:\d{2})?)?|\(\+?\d{2,3}\)\s?(?:\d{4}[\s*.-]?\d{4}|\d{3}[\s*.-]?\d{3}|\d{2}([\s*.-]?)\d{2}\1\d{2}(?:\1\d{2})?))$/;
  // const validatePhone = (value) => value.length === 11 && PHONE_REGEX.test(value);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      companyname: "company",
      email: "email",
    });
  }, []);

  return (
    <div className="w-full">
      <Col>
        <Tabs activeKey={type} size="large" onChange={setType} centered>
          <Tabs.TabPane key="login" tab="Login" />
          <Tabs.TabPane key="signup" tab="Sign up" />
        </Tabs>
        <br />

        {type === "login" && (
          <Form
            className="container"
            onFinish={async (values) => {
              await login(values);
            }}
          >
            <Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "email not valid!",
                },
                {
                  required: true,
                  message: " ",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Item>
            <Item
              name="password"
              rules={[{ required: true, message: " " }, { min: 3 }]}
            >
              <Input.Password placeholder="Password" />
            </Item>
            <div className="remember-me">
              <Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Item>
              <a onClick={() => setShowPage("forgotPassword")}>
                <Text
                  underline
                  style={{
                    color: "#1890FF",
                  }}
                >
                  Forgot password?
                </Text>
              </a>
            </div>
            <Button type="primary" htmlType="submit" className="mt-4 full-width">
              Login
            </Button>
          </Form>
        )}

        {type === "signup" && (
          <Form
            className="container"
            onFinish={async (values) => {
              await signup(values);
            }}
          >
            <Item name="fullName" rules={[{ required: true, message: " " }]}>
              <Input placeholder="Full name" />
            </Item>
            <Item name="companyName" rules={[{ required: true, message: " " }]}>
              <Input disabled={company && true} placeholder="Company name" />
            </Item>
            <Item
              name="phoneNumber"
              hasFeedback
              rules={[
                {
                  pattern: "^[0-9]{10}$",
                  message: "Invalid phone number!",
                },
              ]}
            >
              <Input
                controls={false}
                value={phoneNumber}
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
                placeholder="Phone number"
              />
            </Item>
            <Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "email not valid!",
                },
                {
                  required: true,
                  message: " ",
                },
              ]}
            >
              <Input disabled={email && true} placeholder="Email" />
            </Item>
            <Item
              name="password"
              // rules={[{ required: true, message: 'Min 8 Character, with upper and lower case alphabits, nubmer and special character', pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" }, { min: 7 }]}
              rules={[{ required: true, message: "" }, { min: 7 }]}
            >
              <Input.Password placeholder="Create password" />
            </Item>
            <div
              style={{
                marginBottom: 32,
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <Item name="tnc" valuePropName="checked">
                <Checkbox>I agree to the</Checkbox>
              </Item>
              <a
                style={{ marginTop: "4px" }}
                onClick={() => console.log("t&c")}
              >
                <Text
                  underline
                  style={{
                    color: "#1890FF",
                  }}
                >
                  Terms and Conditions
                </Text>
              </a>
            </div>
            <Button type="primary" htmlType="submit" className="full-width">
              Sign up
            </Button>
          </Form>
        )}
      </Col>
    </div>
  );
}

export default LoginSignup;
