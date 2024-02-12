import {
  Button,
  ConfigProvider,
  Space,
  Input,
  ColorPicker,
  Divider,
  Typography,
  Dropdown,
  theme,
} from "antd";
import logo from "./../assets/logo.png";
import React, { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import Logo from "../assets/logo";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { useToken } = theme;

const UserLayout = ({ children }) => {
  const [primary, setPrimary] = useState("#1D6E71"); // Corrected initial color
  const [relatedColors, setRelatedColors] = useState({
    mainColor: primary,
    lighter: generateRelatedColorsWithTextContrast(primary).lighter,
    darker: generateRelatedColorsWithTextContrast(primary).darker,
    textContrastColor:
      generateRelatedColorsWithTextContrast(primary).textContrastColor,
    complementary: generateRelatedColorsWithTextContrast(primary).complementary,
  });

  const navigate = useNavigate();
  function generateRelatedColorsWithTextContrast(baseColor) {
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };

    const rgbToHex = (rgb) => {
      return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
        .toString(16)
        .slice(1)}`;
    };

    const adjustColorBrightness = (color, factor) => {
      const rgb = hexToRgb(color);
      const adjustedRgb = rgb.map((channel) =>
        Math.min(Math.max(Math.round(channel * factor), 0), 255)
      );
      return rgbToHex(adjustedRgb);
    };

    const calculateContrastRatio = (color1, color2) => {
      const luminance1 = calculateLuminance(hexToRgb(color1));
      const luminance2 = calculateLuminance(hexToRgb(color2));
      const contrast =
        (Math.max(luminance1, luminance2) + 0.05) /
        (Math.min(luminance1, luminance2) + 0.05);
      return contrast;
    };

    const calculateLuminance = (rgb) => {
      const [r, g, b] = rgb.map((channel) => {
        const channelValue = channel / 255;
        return channelValue <= 0.03928
          ? channelValue / 12.92
          : Math.pow((channelValue + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const baseRgb = hexToRgb(baseColor);

    const mainColor = baseColor;
    const lighter = adjustColorBrightness(mainColor, 1.2);
    const darker = adjustColorBrightness(mainColor, 0.7);

    const baseLuminance = calculateLuminance(baseRgb);
    let textContrastColor;
    let linkHoverColor;
    let logoPrim;
    let logoSec;

    console.log({ baseLuminance });

    if (baseLuminance > 0.2) {
      textContrastColor = "black";
      logoPrim = "black";
      logoSec = "#0866C5";
      linkHoverColor = "#7E7E7E";
    } else if (baseLuminance < 0.2) {
      textContrastColor = "white";
      linkHoverColor = "#ABABAB";
      logoPrim = "white";
      logoSec = "#aeb0f5";
    } else {
      textContrastColor =
        calculateContrastRatio(mainColor, lighter) >
          calculateContrastRatio(mainColor, darker)
          ? lighter
          : darker;
    }

    const complementary = rgbToHex([
      225 - baseRgb[0],
      225 - baseRgb[1],
      225 - baseRgb[2],
    ]);

    return {
      mainColor,
      lighter,
      darker,
      textContrastColor,
      complementary,
      linkHoverColor,
      logoPrim,
      logoSec,
    };
  }

  useEffect(() => {
    setRelatedColors(generateRelatedColorsWithTextContrast(primary));
  }, [primary]);

  const items = [
    {
      key: "1",
      // type: "group",
      label: <Text className="text-blue-900">Home & garden</Text>,
      children: [
        {
          key: "1-1",
          label: <Text className="text-gray-500">Kitchen</Text>,
        },
        {
          key: "1-2",
          label: <Text className="text-gray-500">Sanitary</Text>,
        },
      ],
    },
    {
      key: "2",
      label: (
        <div>
          <Text className="text-blue-900">Makeup</Text>
        </div>
      ),
      // type: "group",
      children: [
        {
          key: "2-1",
          label: <Text className="text-gray-500">Brushes</Text>,
        },
        {
          key: "2-2",
          label: <Text className="text-gray-500">Makeup Kits</Text>,
        },
      ],
    },
  ];
  const { token } = useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primary,
          colorLink: relatedColors.textContrastColor,
          colorLinkHover: relatedColors.linkHoverColor,
          colorText: relatedColors.darker,
          colorSuccessText: "red",
          colorTextLabel: relatedColors.darker,
          colorTextDescription: relatedColors.darker,
          colorIcon: relatedColors.darker,
          colorIconHover: relatedColors.textContrastColor,
        },
      }}
    >
      <div>
        <div
          style={{ backgroundColor: primary }}
          className="w-full flex justify-between items-center fixed top-0 shadow-lg z-50"
        >
          <div className="px-10 flex justify-between items-center w-full p-6">
            <div onClick={() => navigate("/")} className="w-32 cursor-pointer">
              <Logo
                primary={relatedColors.logoPrim}
                secondary={relatedColors.logoSec}
              />
            </div>
            <div className="flex items-center">
              <Button type="link">Home</Button>
              <Dropdown
                menu={{
                  items,
                }}
                dropdownRender={(menu) => (
                  <div
                    style={{
                      backgroundColor: token.colorBgElevated,
                      borderRadius: "0 0 6px 6px",
                      boxShadow: token.boxShadowSecondary,
                      marginTop: 36,
                      // width: "100%",
                    }}
                  >
                    {menu}
                  </div>
                )}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Button type="link">Categories</Button>
                  </Space>
                </a>
              </Dropdown>
              <Button type="link">Contact</Button>
            </div>
            <div className="flex items-center">
              <Text
                style={{ color: relatedColors.textContrastColor }}
                className="mr-2"
              >
                Theme:
              </Text>
              <ColorPicker
                value={primary}
                onChangeComplete={(color) => setPrimary(color.toHexString())}
              />
            </div>
          </div>
        </div>
        <div className="mt-24 pt-3">{children}</div>
      </div>
    </ConfigProvider>
  );
};

export default UserLayout;
