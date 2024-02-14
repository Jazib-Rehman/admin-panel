import React from 'react';
import { Space, Table, Tag } from 'antd';

const AdminsTable = ({ columns, data }) => <Table columns={columns} dataSource={data} />;
export default AdminsTable;