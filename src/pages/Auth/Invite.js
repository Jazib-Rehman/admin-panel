import { useEffect, useState } from 'react';
import { Form, Tabs, Input, Typography, Select, Checkbox, Button, Row, Col } from 'antd';
import './welcome.less';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { getUserFromId, updateUser } from "../../services/api";
import { StyledLoader } from '../../components/loader';

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

function Invite() {

  const history = useHistory();
  const [phoneMessage, setPhoneMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("afasfa");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false)

  // const PHONE_REGEX = /^(?:\d{8}(?:\d{2}(?:\d{2})?)?|\(\+?\d{2,3}\)\s?(?:\d{4}[\s*.-]?\d{4}|\d{3}[\s*.-]?\d{3}|\d{2}([\s*.-]?)\d{2}\1\d{2}(?:\1\d{2})?))$/;
  // const validatePhone = (value) => value.length === 11 && PHONE_REGEX.test(value);

  const [form] = Form.useForm()

  useEffect(() => {
    async function fetchParams() {
      try {
        const { userId } = queryString.parse(history.location.search);
        if (!userId)
          return history.push('/')

        setUser(userId)
        const { data, status } = await getUserFromId(userId)
        if (status) {
          form.setFieldsValue({
            companyName: data?.data?.organization?.companyName,
            email: data?.data?.email,
            fullName: data?.data?.fullName,
          });
        }
      } catch (error) {
        console.log({ error })
      }
    }
    fetchParams()
  }, [])

  const signup = async (values) => {
    setLoading(true)
    try {
      const { data, status } = await updateUser(values, user)
      if (status) {
        setLoading(false)
        history.push('/')
      }
    } catch (error) {
      setLoading(false)
      console.log({ error })
    }
  }

  return (
    <div>
      {
        loading &&
        <StyledLoader />
      }
      <Row>
        <Col className='left-side' span={12}>
          <Row className="logo-container">
            <div className='logo'>
              <img src="assets/logo.svg" alt="sabhi" className="light" />
              <img src="assets/sabhi.svg" alt="sabhi" />
            </div>
          </Row>
          <Tabs size="large" centered>
            <Tabs.TabPane key="signup" tab="Sign up Now" />
          </Tabs>
          <br />
          <Row justify="center">
            <Form
              form={form}
              className="container"
              onFinish={async (values) => {
                await signup(values);
              }}
            >
              <Item
                name="fullName"
                rules={[{ required: true, message: ' ' }]}
              >
                <Input disabled placeholder="Full name" />
              </Item>
              <Item
                name="companyName"
                rules={[{ required: true, message: ' ' }]}
              >
                <Input disabled placeholder="Company name" />
              </Item>
              <Item
                name="phoneNumber"
                hasFeedback
                rules={[
                  {
                    pattern: new RegExp(/^(?:\d{8}(?:\d{2}(?:\d{2})?)?|\(\+?\d{2,3}\)\s?(?:\d{4}[\s*.-]?\d{4}|\d{3}[\s*.-]?\d{3}|\d{2}([\s*.-]?)\d{2}\1\d{2}(?:\1\d{2})?))$/),
                    // required: true,
                    message: phoneMessage
                  },
                ]}
              >
                <Input
                  controls={false}
                  value={phoneNumber}
                  addonBefore={prefixSelector}
                  style={{ width: '100%' }}
                  placeholder="Phone number" />
              </Item>
              <Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'email not valid!',
                  },
                  {
                    required: true,
                    message: ' ',
                  },
                ]}
              >
                <Input disabled placeholder="Email" />
              </Item>
              <Item
                name="password"
                // rules={[{ required: true, message: 'Min 8 chars with upper & lower case, nubmer and special chars', pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" }]}
                rules={[{ required: true, message: '' }, { min: 7 }]}
              >
                <Input.Password placeholder="Create password" />
              </Item>
              <div style={{ marginBottom: 32 }}>
                <Checkbox>I agree to the</Checkbox>
                <a onClick={() => console.log('t&c')}>
                  <Text
                    underline
                    style={{
                      color: '#1890FF',
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
          </Row>

        </Col>
        <Col align="center" justify="center" className='right-side' span={12}>
          <img src="assets/rafiki.svg" alt="sabhi" />
        </Col>
      </Row>
    </div>

    // <div>
    //   
    // </div>
  )
}

export default Invite
