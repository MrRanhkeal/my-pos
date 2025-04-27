import { useEffect, useState, useRef } from "react";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
} from "antd";
import { formatDateClient, formatDateServer, request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";
import { IoMdEye } from "react-icons/io";
import { Config } from "../../util/config";
import dayjs from "dayjs";
import { MdPrint } from "react-icons/md";
import OrderPrintInvoice from "../../component/pos/OrderPrintInvoice";
function OrderPage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [orderDetail, setOrderDetails] = useState([]);

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    name: "",
    descriptoin: "",
    status: "",
    parentId: null,
    txtSearch: "",
    currentPrintData: null,
  });

  const [filter, setFiler] = useState({
    from_date: dayjs(), // current
    to_date: dayjs(), // current
  });

  // Add print ref
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const param = {
        txtSearch: state.txtSearch,
        from_date: formatDateServer(filter.from_date),
        to_date: formatDateServer(filter.to_date),
      };
      setLoading(true);
      const res = await request("order", "get", param);
      setLoading(false);
      
      if (res && !res.error) {
        setList(res.list || []);
        setSummary(res.summary || null);
      } else {
        message.error(res?.message || "Failed to load orders");
        setList([]);
        setSummary(null);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error loading orders:', error);
      message.error("An error occurred while loading orders");
      setList([]);
      setSummary(null);
    }
  };
  const getOrderDetail = async (data) => {
    try {
      setLoading(true);
      const res = await request("order_detail/" + data.id, "get");
      setLoading(false);
      
      if (res && !res.error) {
        setOrderDetails(res.list || []);
        setState({
          ...state,
          visibleModal: true,
        });
      } else {
        message.error(res?.message || "Failed to load order details");
        setOrderDetails([]);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error loading order details:', error);
      message.error("An error occurred while loading order details");
      setOrderDetails([]);
    }

    // formRef.setFieldsValue({
    //   id: data.id, // hiden id (save? | update?)
    //   name: data.name,
    //   description: data.description,
    //   status: data.status,
    // });
    //
    // formRef.getFieldValue("id")
  };
  const onClickDelete = async (data) => {
    Modal.confirm({
      title: "លុ​ប",
      descriptoin: "Are you sure to remove?",
      okText: "យល់ព្រម",
      onOk: async () => {
        const res = await request("order", "delete", {
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
    const res = await request("order", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  const printOrder = async (order) => {
    try {
      setLoading(true);
      const res = await request("order_detail/" + order.id, "get");
      setLoading(false);
      
      if (res && !res.error) {
        // Calculate totals from order details
        const total_qty = res.list.reduce((sum, item) => sum + Number(item.qty), 0);
        const sub_total = res.list.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);
        
        // Prepare data for printing
        const cart_list = res.list.map(item => ({
          name: item.p_name,
          price: Number(item.price),
          cart_qty: Number(item.qty),
          discount: Number(item.discount || 0)
        }));

        const objSummary = {
          order_no: order.order_no,
          order_date: order.create_at,
          total_qty,
          sub_total: sub_total.toFixed(2),
          total: Number(order.total_amount).toFixed(2),
          save_discount: (sub_total - Number(order.total_amount)).toFixed(2)
        };

        // Update state to trigger print
        setState(prev => ({
          ...prev,
          currentPrintData: {
            cart_list,
            objSummary
          }
        }));
      }
    } catch (error) {
      setLoading(false);
      console.error('Error printing order:', error);
      message.error("An error occurred while printing order");
    }
  };
  return (
    <MainPage loading={loading}>
      {/* Print Component */}
      <OrderPrintInvoice
        printData={state.currentPrintData}
        onPrintComplete={() => setState(prev => ({ ...prev, currentPrintData: null }))}
      />
      <div className="pageHeader">
        <Space>
          <div>
            <div style={{ fontWeight: "bold" }}>Order</div>
            <div>
              Total : {summary?.total_order || 0} Order |{" "}
              {summary?.total_amount || 0}$
            </div>
          </div>
          <Input.Search
            onChange={(value) =>
              setState((p) => ({ ...p, txtSearch: value.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search"
          />
          <DatePicker.RangePicker
            defaultValue={[
              dayjs(filter.from_date, "DD/MM/YYYY"),
              dayjs(filter.to_date, "DD/MM/YYYY"),
            ]}
            format={"DD/MM/YYYY"}
            onChange={(value) => {
              setFiler((p) => ({
                ...p,
                from_date: value[0],
                to_date: value[1],
              }));
            }}
          />
          <Button type="primary" onClick={getList}>
            Filter
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={"Order Details"}
        footer={null}
        onCancel={onCloseModal}
        width={800}
        //check this
        onFinish={onFinish}
        onClickDelete={onClickDelete}
      >
        <Table
          dataSource={orderDetail}
          pagination={false}
          columns={[
            {
              key: "p_name",
              title: "Product",
              dataIndex: "p_name",
              render: (item, data) => (
                <div>
                  <div style={{ fontWeight: "bold" }}>{data.p_name}</div>
                  <div>
                    {data.p_category_name} | {data.p_brand}
                  </div>
                  <div>{data.p_des}</div>
                </div>
              ),
            },
            {
              key: "p_image",
              title: "Image",
              dataIndex: "p_image",
              render: (value) => (
                <Image
                  src={Config.image_path + value}
                  alt=""
                  style={{ width: 80 }}
                />
              ),
            },

            {
              key: "qty",
              title: "Qty",
              dataIndex: "qty",
            },
            {
              key: "price",
              title: "Price",
              dataIndex: "price",
              render: (value) => <Tag color="green">{value}$</Tag>,
            },
            {
              key: "discount",
              title: "Discount",
              dataIndex: "discount",
              render: (value) => <Tag color="red">{value}%</Tag>,
            },
            {
              key: "total",
              title: "Total",
              dataIndex: "total",
              render: (value) => <Tag color="green">{value}$</Tag>,
            },
          ]}
        />
      </Modal>
      <Table
        dataSource={list}
        columns={[
          {
            key: "order_no",
            title: "Order No",
            dataIndex: "order_no",
          },
          {
            key: "customer_name",
            title: "Customer",
            dataIndex: "customer_name",
            render: (value, data) => (
              <div>
                <div style={{ fontWeight: "bold" }}>{data.customer_name}</div>
                <div>{data.customer_tel}</div>
                <div>{data.customer_address}</div>
              </div>
            ),
          },
          {
            key: "total_amount",
            title: "Total",
            dataIndex: "total_amount",
          },
          {
            key: "paid_amount",
            title: "Paid",
            dataIndex: "paid_amount",
            render: (value) => (
              <div style={{ fontWeight: "bold", color: "green" }}>{value}</div>
            ),
          },
          {
            key: "Due",
            title: "Due",
            render: (value, data) => (
              <Tag color="red">
                {(Number(data.total_amount) - Number(data.paid_amount)).toFixed(
                  2
                )}
              </Tag>
            ),
          },
          {
            key: "payment_method",
            title: "Payment Method",
            dataIndex: "payment_method",
          },
          {
            key: "remark",
            title: "Remark",
            dataIndex: "remark",
          },
          {
            key: "create_by",
            title: "User",
            dataIndex: "create_by",
          },
          {
            key: "create_at",
            title: "Order Date",
            dataIndex: "create_at",
            render: (value) => formatDateClient(value, "DD/MM/YYYY h:mm A"),
          },
          {
            key: "Action",
            title: "Action",
            align: "center",
            render: (item, data, index) => (
              <Space>
                <Button
                  type="primary"
                  icon={<IoMdEye />}
                  onClick={() => getOrderDetail(data, index)}
                />
                <Button
                  type="primary"
                  icon={<MdPrint />}
                  onClick={() => printOrder(data)}
                />
              </Space>
            ),
          },
        ]}
      />

      <OrderPrintInvoice 
        printData={state.currentPrintData}
        onPrintComplete={() => {
          setState(prev => ({ ...prev, currentPrintData: null }));
        }}
      />
    </MainPage>
  );
}

export default OrderPage;
