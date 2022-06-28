import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from 'components/Common/UserInfo';
import { mock } from './__mock';

const PopularMaster = () => {
  return (
    <Row gutter={[20, 30]}>
      {mock.map(master => (
        <Col xs={12} lg={4} key={master.id}>
          <UserInfo image={master.image} userName={master.userName} size="small" />
        </Col>
      ))}
    </Row>
  );
};

export default PopularMaster;
