import React, { useCallback, useState } from 'react';
import { Row, Col, Space, DatePicker, TimePicker, Form, Radio, RadioChangeEvent, Popover, InputNumber } from 'antd';
import styles from '../create.module.scss';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { priceRounding } from 'core/services/rounding';

interface Props {
  disabled?: boolean;
}

const AuctionSetup: React.FC<Props> = ({ disabled }) => {
  const [radioType, setRadioType] = useState('Open Edition');
  const format = 'HH:mm';
  // const dateFormat = 'YYYY-MM-DD';
  // const timeInMs = new Date().toISOString().split('T')[0];
  // const hm = `${new Date().getHours()}:${new Date().getMinutes()}`;

  const onRadioTypeChange = useCallback(
    (e: RadioChangeEvent) => {
      setRadioType(e.target.value);
    },
    [radioType, setRadioType],
  );

  return (
    <>
      <div className={styles.label_input}>Sale settings</div>
      <div className={styles.sale__container}>
        <Row>
          <Col md={12}>
            <Form.Item name="variant">
              <Radio.Group onChange={onRadioTypeChange} value={radioType} defaultValue={radioType}>
                <Space direction="vertical">
                  <Radio value="Open Edition" defaultChecked={true}>
                    Open Edition
                    <Popover content="" title="Fixed price" className={styles.auctionblock__infopic}>
                      <ExclamationCircleFilled />
                    </Popover>
                  </Radio>
                  <Radio value="Auction">Auction</Radio>
                  <Radio value="Fixed Time">Fixed Time</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={12}>
            {radioType === 'Open Edition' && (
              <div>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ type: 'number', min: 0.0001, required: true, message: 'Please input price' }]}
                >
                  <InputNumber
                    className={'input-number'}
                    type={'number'}
                    disabled={disabled}
                    onKeyDown={e => /[+\-,]$/.test(e.key) && e.preventDefault()}
                    formatter={value => priceRounding(value)}
                  />
                </Form.Item>
              </div>
            )}
            {radioType === 'Auction' && (
              <div>
                <Form.Item
                  label="Min bid"
                  name="bid"
                  rules={[{ type: 'number', min: 0.0001, required: true, message: 'Please input price' }]}
                >
                  <InputNumber
                    className={'input-number'}
                    type={'number'}
                    disabled={disabled}
                    formatter={value => priceRounding(value)}
                  />
                </Form.Item>
                <div className={styles.label_input}>Auction start</div>
                <Row gutter={30}>
                  <Col md={12}>
                    <Form.Item name="auctionStartDate" rules={[{ required: true }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="auctionStartHour" rules={[{ required: true }]}>
                      <TimePicker format={format} />
                    </Form.Item>
                  </Col>
                </Row>
                <div className={styles.label_input}>Auction finish</div>
                <Row gutter={30}>
                  <Col md={12}>
                    <Form.Item name="auctionFinishDate" rules={[{ required: true }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="auctionFinishHour" rules={[{ required: true }]}>
                      <TimePicker format={format} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}
            {radioType === 'Fixed Time' && (
              <div>
                <Form.Item
                  label="Price"
                  name="fixprice"
                  rules={[{ type: 'number', min: 0.0001, required: true, message: 'Please input price' }]}
                >
                  <InputNumber
                    className={'input-number'}
                    type={'number'}
                    disabled={disabled}
                    formatter={value => priceRounding(value)}
                  />
                </Form.Item>
                <div className={styles.label_input}>Sale start</div>
                <Row gutter={30}>
                  <Col md={12}>
                    <Form.Item name="saleStartDate" rules={[{ required: true }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="saleStartHour" rules={[{ required: true }]}>
                      <TimePicker format={format} />
                    </Form.Item>
                  </Col>
                </Row>
                <div className={styles.label_input}>Sale finish</div>
                <Row gutter={30}>
                  <Col md={12}>
                    <Form.Item name="saleFinishDate" rules={[{ required: true }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="saleFinishHour" rules={[{ required: true }]}>
                      <TimePicker format={format} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AuctionSetup;
