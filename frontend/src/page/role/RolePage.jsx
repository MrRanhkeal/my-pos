import React, { useEffect, useState } from "react";
import { request } from "../../util/helper";
import { Button, Form, Input, message, Modal, Space, Table, Tag } from "antd";

function RolePage() {
    const [state, setState] = useState({
        list: [],
        loading: false,
        visible: false
    });
    const [form] = Form.useForm();

    useEffect(() => {
        getList();
    }, []);

    // Get list of roles
    const getList = async () => {
        setState(pre => ({ ...pre, loading: true }));
        try {
            const res = await request("role", "get");
            if (res?.data) {
                setState(pre => ({
                    ...pre,
                    list: res.data
                }));
            }
        } catch {
            message.error("Failed to fetch roles");
        } finally {
            setState(pre => ({ ...pre, loading: false }));
        }
    };

    // Handle edit button click
    const handleEdit = (record) => {
        let permissions = record.permissions;
        try {
            if (typeof permissions === 'string') {
                permissions = JSON.parse(permissions);
            }
            if (Array.isArray(permissions)) {
                permissions = permissions.join(', ');
            }
        } catch {
            permissions = '';
        }

        form.setFieldsValue({
            id: record.id,
            name: record.name,
            permissions: permissions
        });
        setState(pre => ({ ...pre, visible: true }));
    };

    // Handle delete button click
    const handleDelete = (record) => {
        Modal.confirm({
            title: "Delete Role",
            content: `Are you sure you want to delete ${record.name}?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await request("role", "delete", { id: record.id });
                    if (res) {
                        message.success("Role deleted successfully");
                        getList();
                    }
                } catch {
                    message.error("Failed to delete role");
                }
            }
        });
    };

    // Handle form submission (create/update)
    const onFinish = async (values) => {
        const method = form.getFieldValue("id") ? "put" : "post";
        try {
            // Convert comma-separated permissions to array
            const permissions = values.permissions
                ? values.permissions.split(',').map(p => p.trim()).filter(Boolean)
                : [];

            const data = {
                name: values.name,
                permissions: JSON.stringify(permissions)
            };

            // Add id for update operation
            if (method === "put") {
                data.id = form.getFieldValue("id");
            }

            const res = await request("role", method, data);
            if (res) {
                message.success(`Role ${method === "put" ? "updated" : "created"} successfully`);
                handleCancel();
                getList();
            }
        } catch {
            message.error(`Failed to ${method === "put" ? "update" : "create"} role`);
        }
    };

    // Handle modal cancel
    const handleCancel = () => {
        form.resetFields();
        setState(pre => ({ ...pre, visible: false }));
    };

    // Table columns configuration
    const columns = [
        {
            title: "No",
            key: "index",
            width: 70,
            render: (_, __, index) => index + 1
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Permissions",
            dataIndex: "permissions",
            key: "permissions",
            render: (permissions) => {
                if (!permissions) return '-';
                try {
                    const permArray = typeof permissions === 'string'
                        ? JSON.parse(permissions)
                        : permissions;

                    if (Array.isArray(permArray) && permArray.length > 0) {
                        return permArray.map((perm, idx) => (
                            <Tag color="blue" key={`${perm}-${idx}`}>{perm}</Tag>
                        ));
                    }
                } catch {
                    console.error('Invalid permissions format:', permissions);
                }
                return '-';
            }
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className="page-content" >
            <div className="page-header" style={{display:"flex"}}>
                <h3>Role Management</h3>
                <Button type="primary" onClick={() => setState(pre => ({ ...pre, visible: true }))}
                style={{
                    marginLeft: "86% ",
                    marginBottom: "20px",
                    display: "optimal",
                }}
                >
                    New Role
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={state.list}
                rowKey="id"
                loading={state.loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={form.getFieldValue("id") ? "Edit Role" : "Create Role"}
                open={state.visible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Role Name"
                        rules={[{ required: true, message: "Please enter role name" }]}
                    >
                        <Input placeholder="Enter role name" />
                    </Form.Item>

                    <Form.Item
                        name="permissions"
                        label="Permissions"
                        rules={[{ required: true, message: "Please enter permissions" }]}
                        help="Enter permissions separated by commas (e.g. order, product, report)"
                    >
                        <Input.TextArea 
                            placeholder="e.g. order, product, report"
                            rows={2}
                        />
                    </Form.Item>

                    <Form.Item className="text-right">
                        <Space>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                {form.getFieldValue("id") ? "Update" : "Create"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default RolePage;