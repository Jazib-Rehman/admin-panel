import { Tabs, Row, Typography } from 'antd';

const { Text } = Typography;
const { TabPane } = Tabs

function Congratulation({ setShowPage }) {

  return (
    <div>
      <Row justify="center" className="padding-bottom">
        <Tabs size="large" centered>
          <TabPane key="Congratulations!" tab="Congratulations!" />
        </Tabs>
      </Row>
      <div className="container">
        <Text>
          Your password has been successfully changed.
        </Text>
        <div
          style={{
            cursor: 'pointer',
            paddingBottom: '30px',
          }}
        >
          <Text
            style={{
              color: '#1890FF',
            }}
            onClick={() => setShowPage("login")}
          >
            Click here to return to the login page
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Congratulation