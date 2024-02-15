import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
const EditSuperAdminModal = ({ isModalOpen, setIsModalOpen }) => {
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Modal title="Edit Super Admin" open={isModalOpen} footer={false} onCancel={handleCancel}>
                <div>
                    <Form
                        name="basic"
                        layout="vertical"
                        className='w-full'
                        labelCol={{
                            span: 8,
                        }}
                        style={{
                            // maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            className='w-full'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input company name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input company description!',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item

                        >
                            <Button type='link' htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
export default EditSuperAdminModal;