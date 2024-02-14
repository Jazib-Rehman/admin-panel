import { Typography, theme } from "antd";
import { FaEye, FaChevronRight } from "react-icons/fa";

const { Text } = Typography;
const DashboardCard = () => {
    const {
        token: { colorIcon, colorBgBase, colorPrimary },
    } = theme.useToken();

    return <div style={{ backgroundColor: colorPrimary }} className="w-full flex justify-between items-center rounded-xl p-4">
        <div className="flex">
            <div style={{ backgroundColor: colorBgBase }} className="p-6 rounded-xl flex justify-center items-center">
                <FaEye color={colorIcon} />
            </div>
            <div className="flex flex-col justify-center items-start pl-2">
                <Text className="text-xl font-semibold">3.456K</Text>
                <Text className="text-md font-semibold">Total Views</Text>
            </div>
        </div>
        <div>
            <FaChevronRight color={colorIcon} />
        </div>
    </div>
}

export default DashboardCard