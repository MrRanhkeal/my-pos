

import { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
} from "antd";
import { formatDateClient, request } from "../../util/helper";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function EmployeePage() {
    const [formRef] = Form.useForm();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        visibleModal: false,
        id: null,
        name: "",
        descriptoin: "",
        status: "",
        parentId: null,
        txtSearch: "",
    });

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        var param = {
            txtSearch: state.txtSearch,
        };
        const res = await request("employee", "get", param);
        setLoading(false);
        if (res) {
            setList(res.list);
        }
    };
    const onClickEdit = (data) => {
        setState({
            ...state,
            visibleModal: true,
        });
        formRef.setFieldsValue({
            id: data.id, // hiden id (save? | update?)
            name: data.name,
            description: data.description,
            status: data.status,
        });
        //
        // formRef.getFieldValue("id")
    };
    const onClickDelete = async (data) => {
        Modal.confirm({
            title: "លុ​ប",
            descriptoin: "Are you sure to remove?",
            okText: "យល់ព្រម",
            onOk: async () => {
                const res = await request("employee", "delete", {
                    id: data.id,
                });
                if (res && !res.error) {
                    // getList(); // request to api response
                    // remove in local
                    message.success(res.message);
                    const newList = list.filter((item) => item.id != data.id);
                    setList(newList);
                }
            },
        });
    };
    const onClickAddBtn = () => {
        setState({
            ...state,
            visibleModal: true,
        });
    };
    const onCloseModal = () => {
        formRef.resetFields();
        setState({
            ...state,
            visibleModal: false,
            id: null,
        });
    };

    const onFinish = async (items) => {
        var data = {
            id: formRef.getFieldValue("id"),
            name: items.name,
            description: items.description,
            status: items.status,
            parent_id: 0,
        };
        var method = "post";
        if (formRef.getFieldValue("id")) {
            // case update
            method = "put";
        }
        const res = await request("employee", method, data);
        if (res && !res.error) {
            message.success(res.message);
            getList();
            onCloseModal();
        }
    };

    const exportToExcel = () => {
        // const data = [
        //   { id: 1, name: "John Doe", age: 28, city: "New York" },
        //   { id: 2, name: "Jane Smith", age: 34, city: "Los Angeles" },
        // ];
        const data = list.map((item) => ({
            ...item,
            gender: item.gender == 1 ? "Male" : "Female",
            dob: formatDateClient(item.dob),
            create_at: formatDateClient(item.create_at),
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Employee List");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer]), "Employee.xlsx");
    };

    return (
        <MainPage loading={loading}>
            <div className="pageHeader">
                <Space>
                    <div>Employee</div>
                    <Input.Search
                        onChange={(value) =>
                            setState((p) => ({ ...p, txtSearch: value.target.value }))
                        }
                        allowClear
                        onSearch={getList}
                        placeholder="Search"
                    />
                    <Button type="primary" onClick={getList}>
                        Filter
                    </Button>
                    <Button type="primary" onClick={exportToExcel}>
                        Excel
                    </Button>
                </Space>
                <Button type="primary" onClick={onClickAddBtn}>
                    NEW
                </Button>
            </div>
            <Modal
                open={state.visibleModal}
                title={formRef.getFieldValue("id") ? "Edit Employee" : "New Employee"}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form layout="vertical" onFinish={onFinish} form={formRef}>
                    <Form.Item name={"name"} label="Employee name">
                        <Input placeholder="Input Employee name" />
                    </Form.Item>
                    <Form.Item name={"description"} label="description">
                        <Input.TextArea placeholder="description" />
                    </Form.Item>
                    <Form.Item name={"status"} label="status">
                        <Select
                            placeholder="Select status"
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

                    <Space>
                        <Button>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {formRef.getFieldValue("id") ? "Update" : "Save"}
                        </Button>
                    </Space>
                </Form>
            </Modal>
            <Table
                dataSource={list}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (item, data, index) => index + 1,
                    },
                    {
                        key: "firstname",
                        title: "firstname",
                        dataIndex: "firstname",
                    },
                    {
                        key: "lastname",
                        title: "lastname",
                        dataIndex: "lastname",
                    },
                    {
                        key: "gender",
                        title: "gender",
                        dataIndex: "gender",
                        render: (value) => (value ? "Male" : "Female"),
                    },
                    {
                        key: "tel",
                        title: "tel",
                        dataIndex: "tel",
                    },
                    {
                        key: "email",
                        title: "email",
                        dataIndex: "email",
                    },
                    {
                        key: "address",
                        title: "address",
                        dataIndex: "address",
                    },
                    {
                        key: "position",
                        title: "position",
                        dataIndex: "position",
                    },
                    {
                        key: "create_at",
                        title: "create_at",
                        dataIndex: "create_at",
                        render: (value) => formatDateClient(value),
                    },
                    {
                        key: "Action",
                        title: "Action",
                        align: "center",
                        render: (item, data, index) => (
                            <Space>
                                <Button
                                    type="primary"
                                    icon={<MdEdit />}
                                    onClick={() => onClickEdit(data, index)}
                                />
                                <Button
                                    type="primary"
                                    danger
                                    icon={<MdDelete />}
                                    onClick={() => onClickDelete(data, index)}
                                />
                            </Space>
                        ),
                    },
                ]}
            />
        </MainPage>
    );
}

export default EmployeePage;
