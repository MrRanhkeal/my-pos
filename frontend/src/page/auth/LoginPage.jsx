import React from "react";
import { Form, Button, Modal, message, Input, Space } from "antd";
import { request } from "../../util/helper";
import {
  setAcccessToken,
  setPermission,
  setProfile,
} from "../../store/profile.store";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Flex } from "antd";
import "./LoginPage.css";

function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onLogin = async (item) => {
    var param = {
      username: item.username, 
      password: item.password,
    };
    const res = await request("auth/login", "post", param);
    if (res && !res.error) {
      setAcccessToken(res.access_token);
      setProfile(JSON.stringify(res.profile));
      setPermission(JSON.stringify(res.permision));
      message.success("Login Success!");
      navigate("/");
    } else {
      message.error(res.message || "Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onLogin}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <div className="login-options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="forgot-link" href="">Forgot password?</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="register-link">
          Dont have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
