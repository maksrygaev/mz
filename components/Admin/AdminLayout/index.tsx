import React from 'react';
import { Col, Row } from 'antd';
import AdminMenu from '../AdminMenu';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div style={{padding: "0 15px", marginTop: '50px'}}>
      <Row gutter={30}>
        <Col xs={24} lg={5}>
          <AdminMenu />
        </Col>
        <Col xs={24} lg={19}>
          {children}
        </Col>
      </Row>
    </div>
  )
}

export default AdminLayout;