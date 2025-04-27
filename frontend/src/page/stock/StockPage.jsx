import React, { useEffect, useState } from 'react';
import { Table, Card, message, Image, Tag,Alert } from 'antd';
import { request } from '../../util/helper';
// import PageContainer from '../container/PageContainer';

const StockPage = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const getList = () => {
        setLoading(true);
        request('stock/getstocklist', 'get')
            .then(res => {
                console.log('Stock response:', res);
                if (res.error) {
                    message.error(res.message);
                    return;
                }
                if (Array.isArray(res.data)) {
                    setList(res.data);
                } else {
                    message.error('Invalid data format received');
                }
            })
            .catch(err => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getList();
    }, []);

    const columns = [
        {
            key: "No",
            title: "No",
            render: (item, data, index) => index + 1,
        },
        {
            title: 'Product Name',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Quantity',
            dataIndex: 'p_qty',
            key: 'p_qty',
            render: (qty) => (
                <>
                    {qty}{' '}
                    <Tag 
                    style={{ background: 'transparent' }}
                    color={qty === 0 ? 'red' : qty <= 5 ? 'yellow' : 'green'}>
                        {qty === 0 ? 'Stock Sold Out' : qty <= 5 ? 'Low Stock' : 'In Stock'}
                    </Tag>
                </>
            )
        },
        {
            title: 'Brand',
            dataIndex: 'p_brand',
            key: 'p_brand',
        },
        {
            title: 'Category',
            dataIndex: 'c_name',
            key: 'c_name',
        },
        {
            key: "p_image",
            title: "Image",
            dataIndex: "p_image",
            render: (value) =>
              value ? (
                <Image
                  src={`http://localhost/coffee/${value}`}
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                  preview={{
                    mask: 'View'
                  }}
                />
              ) : (
                <div
                  style={{ backgroundColor: "#EEE", width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  No Image
                </div>
              ),
          },
        {
            title: 'Created By',
            dataIndex: 'create_by',
            key: 'create_by',
        },
    ];

    return (
        <div className="container-fluid">
            <Card title="Stock Management">
                <Table
                    columns={columns}
                    dataSource={list}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} items`
                    }}
                />
            </Card>
        </div>
    );
};

export default StockPage;
