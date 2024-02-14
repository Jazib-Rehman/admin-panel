import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import chartData from '../../json/LineChartMockData.json'
import { theme } from 'antd';

const LineGraph = () => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     asyncFetch();
    // }, []);

    // const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
    //         .then((response) => response.json())
    //         .then((json) => setData(json))
    //         .catch((error) => {
    //             console.log('fetch data failed', error);
    //         });
    // };
    const config = {
        data: chartData,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
            label: {
                formatter: (v) => v,
            },
        },
        legend: {
            position: 'top',
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        }
    };
    const {
        token: { colorIcon, colorBgContainer, colorPrimary },
    } = theme.useToken();

    return <div style={{ backgroundColor: colorPrimary }} className='rounded-xl p-4 w-full'>
        <Line {...config} />
    </div>
};

export default LineGraph;