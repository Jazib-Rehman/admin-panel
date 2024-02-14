import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import chartData from '../../json/BarGraphMockData.json'
import { theme } from 'antd';

const BarGraph = () => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     asyncFetch();
    // }, []);

    // const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
    //         .then((response) => response.json())
    //         .then((json) => setData(json))
    //         .catch((error) => {
    //             console.log('fetch data failed', error);
    //         });
    // };
    const config = {
        data: chartData,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: true,
        // columnStyle: {
        //     radius: [20, 20, 0, 0],
        // },
    };
    const {
        token: { colorIcon, colorBgContainer, colorPrimary },
    } = theme.useToken();

    return <div style={{ backgroundColor: colorPrimary }} className='rounded-xl p-4 w-full'>
        <Column {...config} />
    </div>


};

export default BarGraph;