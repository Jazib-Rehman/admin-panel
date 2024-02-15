import { Button, Divider, Space, Tag, Typography, theme } from "antd";
import AdminsTable from "../../components/Tables/AdminsTable";
import AddCompanyAdminModal from "../../components/Modals/AddCompanyAdminModal";
import { useState } from "react";
import EditCompanyAdminModal from "../../components/Modals/EditCompanyAdminModal";

const { Text } = Typography;
const CompanyAdmins = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
                    <Button type="link" onClick={() => setIsEditModalOpen(true)}>Edit</Button>
                    <Button type="link" >Delete</Button>
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
            <Text className="text-3xl font-semibold">Company Admins</Text>
            <Button onClick={() => setIsModalOpen(true)} type="link">Add New +</Button>
        </div>
        <Divider style={{ margin: 0 }} />
        <AdminsTable columns={columns} data={data} />
        <EditCompanyAdminModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
        <AddCompanyAdminModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
}

export default CompanyAdmins;