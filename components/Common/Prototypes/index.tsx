import React, { FC, useState } from 'react';
import { Select, Button, Col, Row, Input } from 'antd';
import prototypes from './Prototypes.module.scss';

export const Prototypes: FC = () => {
  const { Option } = Select;
  const [value, setValue] = useState('');
  return (
    <section className="container">
      <Row>
        <Col>
          <div className={prototypes.demo}>
            <Button shape={'round'} className="btn btn-rounded-white-purple-border">1.125 ETH</Button>
          </div>
          <div className={prototypes.demo}>
            <Button shape={'round'} className="btn rounded-small-white-border-black-text ">Name Wallet 1</Button>
          </div>
          <div className={prototypes.demo}>
            <Button shape={'round'} className="btn btn-rounded-black">All</Button>
          </div>
          <div className={prototypes.demo}>
            <Select
              style={{ width: 300 }}
              placeholder="In all category"
              optionFilterProp="children"
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="1">Not Identified</Option>
              <Option value="2">Closed</Option>
              <Option value="3">Communicated</Option>
              <Option value="4">Identified</Option>
              <Option value="5">Resolved</Option>
              <Option value="6">Cancelled</Option>
            </Select>
          </div>
          <div className={prototypes.demo}>
            <Input
              style={{ width: 300 }}
              placeholder="Email or phone"
              className={'input input-small-rounded-black-border'}
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};