import { Space, Spin } from 'antd'
import React from 'react'
import "./Loader.less"

export const CustomeLoader = (props) => {
    return (
        <div className="simpleLoader">
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    )
}

export const StyledLoader = (props) => {
    return (
        <div className="styledLoader">
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    )
}