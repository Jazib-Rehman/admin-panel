import { Typography, theme } from "antd";
import DashboardCard from "../../components/DashboardCard";
import LineGraph from "../../components/Graphs/Line";
import BarGraph from "../../components/Graphs/Bar";

const { Text } = Typography;

const Dashboard = () => {
    const {
        token: { colorPrimary },
    } = theme.useToken();

    return <div className="flex w-full">
        <div className="w-2/3 flex flex-wrap">
            <div className="w-1/2 p-3">
                <DashboardCard />
            </div>
            <div className="w-1/2 p-3">
                <DashboardCard />
            </div>
            <div className="w-1/2 p-3">
                <DashboardCard />
            </div>
            <div className="w-1/2 p-3">
                <DashboardCard />
            </div>
            <div className="w-full p-3">
                {/* <LineGraph /> */}
            </div>
        </div>
        <div className="w-1/3 p-3">
            {/* <BarGraph /> */}
        </div>
    </div>;
}

export default Dashboard;