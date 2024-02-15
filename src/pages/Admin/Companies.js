import { Button, Divider, Space, Tag, Typography, theme } from "antd";
import AdminsTable from "../../components/Tables/AdminsTable";
import AddCompanyModal from "../../components/Modals/AddCompanyModal";
import { useState } from "react";

const { Text } = Typography;
const Companies = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        token: { colorIcon, colorBgContainer, colorPrimary },
    } = theme.useToken();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            email: 'john@gmail.com',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            email: 'jim @gmail.com',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            email: 'joe @gmail.com',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return <div style={{ backgroundColor: colorPrimary }}>
        <div className="flex justify-between items-center px-3 py-4 w-full">
            <Text className="text-3xl font-semibold">Companies</Text>
            <Button onClick={() => setIsModalOpen(true)} type="link">Add New +</Button>
        </div>
        <Divider style={{ margin: 0 }} />
        <AdminsTable columns={columns} data={data} />
        <AddCompanyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
}

export default Companies;