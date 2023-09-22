import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import Sider from "./Sider";

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="site-layout">
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb />
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
