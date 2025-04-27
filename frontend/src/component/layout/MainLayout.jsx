import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import Logo from "../../../../backend/image/product/coffee.jpg";
import ImgUser from "../../assets/admin.jpg";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import {
  getPermission,
  getProfile,
  setAcccessToken,
  setProfile,
} from "../../store/profile.store";
import { request } from "../../util/helper";
import { configStore } from "../../store/configStore";
const { Header, Content, Footer, Sider } = Layout;

const items_menu = [
  {
    key: "",
    label: "Dashabord",
    children: null,
  },
  {
    key: "pos",
    label: "POS",
    children: null,
  },
  {
    key: "customer",
    label: "Customer",
    children: null,
  },
  {
    key: "order",
    label: "Order",
    children: null,
  },
  {
    key: "stock",
    label: "Stock",
    children: null,
  },
  {
    label: "Product",
    children: [
      {
        key: "product",
        label: "List Porduct",
        children: null,
      },
      {
        key: "category",
        label: "Category",
        children: null,
      },
    ],
  },
  {
    label: "Purchase",
    children: [
      {
        key: "supplier",
        label: "Supplier",
        children: null,
      },
      {
        key: "purchase",
        label: "List purchase",
        children: null,
      },
      {
        key: "purchase_product",
        label: "Purchase Product",
        children: null,
      },
    ],
  },
  {
    label: "Expanse",
    children: [
      {
        key: "expanse_type",
        label: "Expanse Type",
        children: null,
      },
      {
        key: "expanse",
        label: "Expanse",
        children: null,
      },
    ],
  },
  {
    label: "Employee",
    children: [
      {
        key: "employee",
        label: "Employee",
        children: null,
      },
      {
        key: "payroll",
        label: "Payroll",
        children: null,
      },
    ],
  },
  {
    label: "Report",
    children: [
      {
        key: "report_sale_summary",
        label: "Sale summary",
        children: null,
      },
      {
        key: "report_expense_summary",
        label: "Expense Summary",
        children: null,
      },
      {
        key: "report_new_customer_summary",
        label: "New Cutomer Summary ",
        children: null,
      },
      {
        key: "report_top_sale",
        label: "Top sale",
        children: null,
      },
      {
        key: "report_purchase_summary",
        label: "Purchase Summary",
        children: null,
      },
    ],
  },

  {
    label: "User",
    children: [
      {
        key: "user",
        label: "User",
        children: null,
      },
      {
        key: "role",
        label: "Role",
        children: null,
      },
      {
        key: "role_permission",
        label: "Role Permmission",
        children: null,
      },
    ],
  },

  {
    label: "Setting",
    children: [
      {
        key: "Currency",
        label: "Currency",
        children: null,
      },
      {
        key: "langauge",
        label: "Langauge",
        children: null,
      },
    ],
  },
];

const MainLayout = () => {
  const permission = getPermission();
  const { setConfig } = configStore();
  const profile = getProfile();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    getMenuByUser();
    getConfig();
    if (!profile) {
      navigate("/login");
    }
  }, []);

  const getMenuByUser = () => {
    let new_item_menu = [];
    items_menu?.map((item1) => {
      // level one
      const p1 = permission?.findIndex(
        (data1) => data1.web_route_key == "/" + item1.key
      );
      if (p1 != -1) {
        new_item_menu.push(item1);
      }

      // level two
      if (item1?.children && item1?.children.length > 0) {
        let childTmp = [];
        item1?.children.map((data1) => {
          permission?.map((data2) => {
            if (data2.web_route_key == "/" + data1.key) {
              childTmp.push(data1);
            }
          });
        });
        if (childTmp.length > 0) {
          item1.children = childTmp; // update new child dreen
          new_item_menu.push(item1);
        }
      }
    });
    setItems(new_item_menu);
  };

  const getConfig = async () => {
    const res = await request("config", "get");
    if (res) {
      setConfig(res);
    }
  };

  const onClickMenu = (item) => {
    navigate(item.key);
  };
  const onLoginOut = () => {
    setProfile("");
    setAcccessToken("");
    navigate("/login");
  };

  if (!profile) {
    return null;
  }

  const itemsDropdown = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          chage password
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "logout",
      danger: true,
      label: "Logout",
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        {/* {permission?.map((item, index) => (
          <div key={index}>
            <div>
              {item.name}:{item.web_route_key}
            </div>
          </div>
        ))} */}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClickMenu}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <div className="admin-header-g1">
            <div>
              <img className="admin-logo" src={Logo} alt="Logo" />
            </div>
            <div>
              <div className="txt-brand-name">Coffee-POS</div>
              {/* <div className="txt-brand-name">Count : {count}</div> */}

              <div>Coffee Shop & Restaurant</div>
            </div>
            <div>
              <Input.Search
                style={{ width: 180, marginLeft: 15, marginTop: 10 }}
                size="large"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="admin-header-g2">
            <IoIosNotifications className="icon-notify" />
            <MdOutlineMarkEmailUnread className="icon-email" />
            <div>
              <div className="txt-username">{profile?.name}</div>
              <div>{profile?.role_name}</div>
            </div>
            <Dropdown
              menu={{
                items: itemsDropdown,
                onClick: (event) => {
                  if (event.key == "logout") {
                    onLoginOut();
                  }
                },
              }}
            >
              <img className="img-user" src={ImgUser} alt="Logo" />
            </Dropdown>
          </div>
        </div>
        <Content
          style={{
            margin: "10px",
          }}
        >
          <div
            className="admin-body"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
