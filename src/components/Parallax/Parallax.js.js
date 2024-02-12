import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import image1 from "../../assets/parallax/image1.jpg";
import image2 from "../../assets/parallax/image2.png";
import image3 from "../../assets/parallax/image3.png";
import image4 from "../../assets/parallax/image4.png";
import image5 from "../../assets/parallax/image5.png";
import image6 from "../../assets/parallax/image6.png";
import image7 from "../../assets/parallax/image7.png";
import image8 from "../../assets/parallax/image8.png";
import "./Parallax.css";
import { Button, Typography } from "antd";
import banner from "../../assets/banner.jpg";
import FeatureProducts from "../FeatureProducts";

const { Text } = Typography;

const ParallaxComp = () => {
  return (
    <div>
      <Parallax pages={2} style={{ top: 0, left: 0 }} className="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <img
            src={banner}
            alt="JZ Solutions banner, Front"
            className="w-full h-screen object-cover"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.6}>
          <div className="pl-10 w-full mt-96">
            <div className="p-10 rounded-xl shadow-lg bg-white flex flex-col w-3/12 text-left">
              <Text className="text-4xl font-bold opacity-75">
                Shop Our Latest
              </Text>
              <Text className="text-4xl font-bold opacity-75 mt-3">
                Products
              </Text>
              <div>
                <Button
                  size="large"
                  type="primary"
                  className="rounded-full mt-4"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.1}>
          <FeatureProducts />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default ParallaxComp;
