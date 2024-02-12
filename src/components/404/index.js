import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Comp_404 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate(-1)} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default Comp_404;
