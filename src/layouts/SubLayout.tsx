import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="site-layout">
      <Header />
      <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
