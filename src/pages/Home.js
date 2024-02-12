import { Button, Input, Space, Typography } from "antd";
import banner from "./../assets/banner.jpg";
import FeatureProducts from "../components/FeatureProducts";
import ParallaxComp from "../components/Parallax/Parallax.js";

const { Text } = Typography;

const Home = () => {
  return (
    <div>
      <ParallaxComp />

      {/* <FeatureProducts /> */}
    </div>
  );
};
export default Home;
