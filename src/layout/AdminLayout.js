import {
    Button,
    ConfigProvider,
    Typography,
    theme,
    Layout,
    Menu,
    Badge,
    Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaSitemapSolid } from "react-icons/lia";
import { PiUsers } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { SiAwsorganizations } from "react-icons/si";
import { CiCircleQuestion } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useToken } = theme;

const AdminLayout = ({ children }) => {
    const [primary, setPrimary] = useState("#FFFFFF"); // Corrected initial color
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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
        const containerBackground = adjustColorBrightness(mainColor, 7.5);
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
            containerBackground,
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

    const { token } = useToken();

    const onSwitchChange = (val) => {
        if (val) {
            setPrimary("#000829")
        } else {
            setPrimary("#FFFFFF")
        }
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primary,
                    colorBgBase: primary === "#FFFFFF" ? "#ebebf2" : relatedColors.darker,
                    colorBgContainer: primary,
                    colorLink: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorLinkHover: relatedColors.linkHoverColor,
                    colorText: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorSuccessText: "red",
                    colorTextLabel: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorTextBase: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorTextSecondary: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorTextHeading: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorTextTertiary: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorTextDescription: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorIcon: primary === "#FFFFFF" ? "#1420ff" : "white",
                    colorIconHover: relatedColors.textContrastColor,
                },
            }}
        >
            <Layout>
                <Sider style={{ backgroundColor: primary }} width={300} trigger={null} collapsible collapsed={collapsed}>
                    <div className="py-6 flex justify-center items-center" >
                        {/* <Text
                            style={{ color: relatedColors.textContrastColor, fontFamily: "monospace" }}
                            className="text-2xl"
                        >
                            Admin Panel
                        </Text> */}
                        <div className="w-full h-24 flex justify-center items-center">
                            {
                                primary === "#FFFFFF" ?
                                    <img src="../assets/logo.png" alt="sabhi" className="w-full" />
                                    :
                                    <img src="../assets/logo-dark.png" alt="sabhi" className="w-full" />
                            }
                        </div>
                    </div>
                    <Menu
                        // theme="dark"
                        className="py-5"
                        style={{ backgroundColor: "rgba(0,0,0,0)", }}
                        mode="inline"
                        defaultOpenKeys={['2']}
                        selectedKeys={window.location.pathname === "/admin/dashboard" ? "1" :
                            window.location.pathname === "/admin/company-admins" ? "2-1" :
                                window.location.pathname === "/admin/super-admins" ? "2-2" :
                                    "3"}
                        items={[
                            {
                                key: '1',
                                icon: <LuLayoutDashboard style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                label: <Link to="/admin/dashboard"><div className="flex items-center justify-between px-2"><Text >Dashboard</Text> <Badge
                                    className="site-badge-count-109"
                                    count={109}
                                    style={{ backgroundColor: "#1420ff", color: "white" }}
                                /></div></Link>,
                            },
                            {
                                key: '2',
                                icon: <PiUsers style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                label: <div className="flex items-center justify-between px-2"><Text>Users</Text> <Badge
                                    className="site-badge-count-109"
                                    count={0}
                                    style={{ backgroundColor: "#1420ff", color: "white" }}
                                /></div>,
                                children: [
                                    {
                                        key: '2-1',
                                        icon: <GrUserAdmin style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                        label: <Link to="/admin/company-admins"><div className="flex items-center justify-between px-2"><Text>Company Admins</Text> <Badge
                                            className="site-badge-count-109"
                                            count={0}
                                            style={{ backgroundColor: "#1420ff", color: "white" }}
                                        /></div></Link>,
                                    },
                                    {
                                        key: '2-2',
                                        icon: <RiAdminLine style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                        label: <Link to="/admin/super-admins"><div className="flex items-center justify-between px-2"><Text>Super Admins</Text> <Badge
                                            className="site-badge-count-109"
                                            count={0}
                                            style={{ backgroundColor: "#1420ff", color: "white" }}
                                        /></div></Link>,
                                    },
                                ]
                            },
                            {
                                key: '3',
                                icon: <SiAwsorganizations style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                label: <Link to="/admin/dashboard"><div className="flex items-center justify-between px-2"><Text>Companies</Text> <Badge
                                    className="site-badge-count-109"
                                    count={0}
                                    style={{ backgroundColor: "#1420ff", color: "white" }}
                                /></div></Link>,
                            },
                            {
                                key: '4',
                                icon: <CiCircleQuestion style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                label: <Link to="/admin/dashboard"><div className="flex items-center justify-between px-2"><Text>Questions</Text> <Badge
                                    className="site-badge-count-109"
                                    count={0}
                                    style={{ backgroundColor: "#1420ff", color: "white" }}
                                /></div></Link>,
                            },
                            {
                                key: '5',
                                icon: <LiaClipboardListSolid style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                label: <Link to="/admin/dashboard"><div className="flex items-center justify-between px-2"><Text>Challanges</Text> <Badge
                                    className="site-badge-count-109"
                                    count={3}
                                    style={{ backgroundColor: "#1420ff", color: "white" }}
                                /></div></Link>,
                            }
                        ]}
                    />
                    <Menu
                        // theme="dark"
                        className="py-5"
                        style={{ backgroundColor: "rgba(0,0,0,0)", }}
                        mode="inline"
                        defaultOpenKeys={['6']}
                        items={[
                            {
                                key: '6',
                                icon: <IoSettingsOutline style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                label: <div className="flex items-center justify-between px-2"><Text>Settings</Text> <Badge
                                    className="site-badge-count-109"
                                    count={0}
                                    style={{ backgroundColor: "#1420ff", color: "white" }}
                                /></div>,
                                children: [
                                    {
                                        key: '6-1',
                                        icon: <LiaSitemapSolid style={{ color: primary === "#FFFFFF" ? "#1420ff" : "white" }} />,
                                        label: <Link to="/admin/dashboard"><div className="flex items-center justify-between px-2"><Text>Item 1</Text> <Badge
                                            className="site-badge-count-109"
                                            count={0}
                                            style={{ backgroundColor: "#1420ff", color: "white" }}
                                        /></div></Link>,
                                    },
                                ]
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header className="w-full flex justify-between items-center h-20" style={{ padding: "0 40px 0 0", background: primary }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color: primary === "#FFFFFF" ? "#1420ff" : "white"
                            }}
                        />
                        <div className="flex items-center">
                            <Text
                                className="mr-2"
                            >
                                Theme:
                            </Text>
                            {/* <ColorPicker
                                value={primary}
                                onChangeComplete={(color) => setPrimary(color.toHexString())}
                            /> */}

                            <Switch style={{ backgroundColor: primary === "#FFFFFF" ? "#b4b4b8" : "#1420ff" }} onChange={onSwitchChange} />
                        </div>
                    </Header>
                    <Content
                        style={{
                            // margin: '24px 16px',
                            padding: 24,
                            minHeight: "90.1vh",
                            background: primary === "#FFFFFF" ? "#ebebf2" : relatedColors.lighter,
                            // borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className="">{children}</div>
                    </Content>
                </Layout>
            </Layout>














            {/* <div>
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
            </div> */}
        </ConfigProvider >
    );
};

export default AdminLayout;
