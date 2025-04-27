import React, { useEffect, useState } from "react";
import { request } from "../../util/helper";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { resetWarned } from "antd/es/_util/warning";
import { configStore } from "../../store/configStore";

function UserPage() {
  const [form] = Form.useForm();
  const { config } = configStore();
  const [list, setList] = useState([]);
  const [state, setState] = useState({
    list: [],
    role_id: null,
    loading: false,
    visible: false,
    isEdit: false,
    editingUser: null
  });
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await request("auth/get-list", "get");
      if (res && !res.error) {
        setList(res.data || []); // Changed from res.list to res.data to match backend response
        setState(prev => ({
          ...prev,
          role: res.roles || [] // Store roles from the response
        }));
      }
    } catch (error) {
      console.error("Failed to fetch list:", error);
      message.error("Failed to fetch user list");
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // const getList = async () => {
  //   const res = await request("auth/get-list", "get");
  //   if (res && !res.error) {
  //     setState((pre) => ({
  //       ...pre,
  //       list: res.list,
  //       role: res.role,
  //     }));
  //   }
  // };

  const clickBtnEdit = (record) => {
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      username: record.username,
      role_id: record.role_id,
      is_active: record.is_active
    });
    setState(prev => ({
      ...prev,
      visible: true,
      isEdit: true,
      editingUser: record
    }));
  };

  const clickBtnDelete = async (record) => {
    try {
      const res = await request(`auth/delete/${record.id}`, "delete");
      if (res && !res.error) {
        message.success("User deleted successfully");
        getList();
      } else {
        message.error(res.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete user");
    }
  };

  const handleCloseModal = () => {
    setState((pre) => ({
      ...pre,
      visible: false,
      isEdit: false,
      editingUser: null
    }));
    form.resetFields();
  };

  const handleOpenModal = () => {
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };
  // {"name":"a","username":"b","password":"12","role_id":2,"is_active":0}
  // const onFinish = async (item) => {
  //   if (item.password !== item.confirm_password) {
  //     message.warning("Password and Confirm Password Not Match!");
  //     return;
  //   }
  //   var data = {
  //     ...item,
  //   };
  //   const res = await request("auth/register", "post", data);
  //   if (res && !res.error) {
  //     message.success(res.message);
  //     getList();
  //     handleCloseModal();
  //   } else {
  //     message.warning(res.message);
  //   }
  // };

  const onFinish = async (item) => {
    if (!state.isEdit && item.password !== item.confirm_password) {
      message.warning("Password and Confirm Password do not match!");
      return;
    }

    // Get the current user's name from the profile
    const currentUser = JSON.parse(localStorage.getItem('profile')) || {};
    const create_by = currentUser.name || 'system';

    const data = {
      ...item,
      role_id: state.role_id || item.role_id,
      create_by: state.isEdit ? undefined : create_by, // Only set create_by for new users
    };

    try {
      let res;
      if (state.isEdit) {
        // Update existing user
        res = await request("auth/update", "put", {
          ...data,
          id: state.editingUser.id
        });
      } else {
        // Create new user
        res = await request("auth/register", "post", data);
      }

      if (res && !res.error) {
        message.success(res.message || (state.isEdit ? "Update successful" : "Registration successful"));
        getList();
        handleCloseModal();
      } else {
        message.warning(res.message || (state.isEdit ? "Update failed" : "Registration failed"));
      }
    } catch (err) {
      console.error(state.isEdit ? "Update error:" : "Registration error:", err);
      message.error(`Something went wrong during ${state.isEdit ? "update" : "registration"}!`);
    }
  };


  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>User</div>
          <Input.Search style={{ marginLeft: 10 }} placeholder="Search" />
        </div>
        <Button type="primary" onClick={handleOpenModal}>
          New
        </Button>
      </div>
      <Modal
        title={state.isEdit ? "Edit User" : "New User"}
        open={state.visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please fill in name",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name={"username"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please fill in email",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="password"
            rules={[
              {
                required: true,
                message: "Please fill in password",
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item
            name={"confirm_password"}
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please fill in confirm password",
              },
            ]}
          >
            <Input.Password placeholder="confirm password" />
          </Form.Item>

          <Select
            style={{ width: "100%" }}
            placeholder="Select role"
            options={(config?.role || []).map(role => ({
              label: role.name, // or cust.fullName or cust.whatever is correct
              value: role.id,   // or cust.customer_id depending on your data
            }))}
            onSelect={(value) => {
              setState((p) => ({
                ...p,
                role_id: value,
              }));
            }}
          />

          {/* <Form.Item
            name={"role_id"}
            label="Role"
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select placeholder="Select Role" options={state.role} />
          </Form.Item> */}
          <Form.Item
            name={"is_active"}
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Select
              placeholder="Select Status"
              options={[
                {
                  label: "Active",
                  value: 1,
                },
                {
                  label: "InActive",
                  value: 0,
                },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        // dataSource={state.list}
        dataSource={list}
        loading={state.loading}
        columns={[
          {
            key: "no",
            title: "No",
            render: (value, data, index) => index + 1,
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "username",
            title: "Username",
            dataIndex: "username",
          },
          {
            key: "role_name",
            title: "Role Name",
            dataIndex: "role_name",
          },
          {
            key: "is_active",
            title: "Status",
            dataIndex: "is_active",
            render: (value) =>
              value ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">In Active</Tag>
              ),
          },
          {
            key: "create_by",
            title: "Create By",
            dataIndex: "create_by",
          },
          {
            key: "action",
            title: "Action",
            align: "center",
            render: (value, data) => (
              <Space>
                <Button onClick={() => clickBtnEdit(data)} type="primary">
                  Edit
                </Button>
                <Button
                  onClick={() => clickBtnDelete(data)}
                  danger
                  type="primary"
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}

export default UserPage;
