import React, { useCallback, useState } from 'react';
import { Col, DatePicker, Form, Input, InputNumber, Radio, RadioChangeEvent, Row } from 'antd';

import styles from '../createPost.module.scss';

const Sales: React.FC = () => {
  const [radioType, setRadioType] = useState('simple');
  const [radioLicense, setRadioLicense] = useState('single');

  const onRadioTypeChange = useCallback(
    (e: RadioChangeEvent) => {
      setRadioType(e.target.value);
    },
    [radioType, setRadioType],
  );

  const onRadioChangeSecond = useCallback(
    (e: RadioChangeEvent) => {
      setRadioLicense(e.target.value);
    },
    [radioLicense, setRadioLicense],
  );

  return (
    <>
      <div className={styles.tabContentBlock}>
        <p className={styles.tabBlockTitle}>Type of transaction</p>
        <Radio.Group onChange={onRadioTypeChange} value={radioType}>
          <Radio value="simple">Simple</Radio>
          <Radio value="auction">Auction</Radio>
        </Radio.Group>
        <Row>
          <Col md={10}>
            {radioType === 'simple' && (
              <>
                <Form.Item label="Price" name="price">
                  <Input name="price" placeholder="Price" />
                </Form.Item>
                <p>Close auction</p>
                <Row gutter={10}>
                  <Col xs={12}>
                    <Form.Item name="date" className={styles.dateItem}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item name="time" className={styles.dateItem}>
                      <Input placeholder="Choose the time" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
            {radioType === 'auction' && <div>auction radio content</div>}
          </Col>
        </Row>
      </div>
      <div className={styles.tabContentBlock}>
        <p className={styles.tabBlockTitle}>Transaction license</p>
        <Radio.Group onChange={onRadioChangeSecond} value={radioLicense}>
          <Radio value="single">Single</Radio>
          <div className={styles.limited}>
            <Radio value="limited">Limited</Radio>
            {radioLicense === 'limited' && (
              <InputNumber className={'input-number'} type={'number'} name="transaction" min={1} max={10} defaultValue={3} />
            )}
          </div>
          <Radio value="unlimited">Unlimited</Radio>
        </Radio.Group>
      </div>
    </>
  );
};

export default Sales;
