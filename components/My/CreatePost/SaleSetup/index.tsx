import React, { useCallback, useState } from 'react';
import {
  Row,
  Col,
  Space,
  DatePicker,
  TimePicker,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Switch,
  Select,
  Button,
  Avatar,
  InputNumber,
} from 'antd';
import moment from 'moment';
import style from '../create.module.scss';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SaleSetup: React.FC<Props> = ({ onChange }) => {
  const { Option } = Select;
  const [radioType, setRadioType] = useState('Open Edition');
  const [radioLicense, setRadioLicense] = useState('single');
  const format = 'HH:mm';
  const dateFormat = 'YYYY-MM-DD';
  const timeInMs = new Date().toISOString().split('T')[0];
  const hm = `${new Date().getHours()}:${new Date().getMinutes()}`;

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
  const onSwitch = (checked: any) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <>
      <div className={style.button__container}>
        <Button className="btn btn-rounded-small-white-border-black-text">Artworks</Button>
        <Button
          className="btn btn-rounded-small-black-border-white-text"
          style={{ marginLeft: '30px' }}
        >
          Sale settings
        </Button>
      </div>
      <div className={style.label_input}>Auction type</div>
      <div className={style.sale__container}>
        <Row>
          <Col md={12}>
            <Radio.Group
              onChange={onRadioTypeChange}
              value={radioType}
              defaultValue={'Open Edition'}
            >
              <Space direction="vertical">
                <Radio value="Open Edition">Open Edition</Radio>
                <Radio value="Auction">Auction</Radio>
                <Radio value="Fixed Time">Fixed Time</Radio>
              </Space>
            </Radio.Group>
          </Col>
          <Col md={12}>
            {radioType === 'Open Edition' && (
              <div>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: 'Please input the price' }]}
                >
                  <Input onChange={onChange} name="price" />
                </Form.Item>
              </div>
            )}
            {radioType === 'Auction' && (
              <div>
                <Form.Item
                  label="Min bid"
                  name="bid"
                  rules={[{ required: true, message: 'Please input the min bid' }]}
                >
                  <Input onChange={onChange} />
                </Form.Item>
                <div className={style.label_input}>Auction start</div>
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
                <div className={style.label_input}>Auction finish</div>
                <Row gutter={30}>
                  <Col md={12}>
                    <Form.Item name="auctionFinishDate">
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="auctionFinishHour">
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
                  rules={[{ required: true, message: 'Please input the price' }]}
                >
                  <Input onChange={onChange} />
                </Form.Item>
                <div className={style.label_input}>Sale start</div>
                <Row gutter={30}>
                  <Col md={12}>
                    <Form.Item name="sale-start-date">
                      <DatePicker defaultValue={moment(timeInMs, dateFormat)} />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="sale-start-hour">
                      <TimePicker defaultValue={moment(hm, format)} format={format} />
                    </Form.Item>
                  </Col>
                </Row>
                <div className={style.label_input}>Sale finish</div>
                <Row gutter={30}>
                  <Col md={12}>
                    <Form.Item name="sale-finish-date">
                      <DatePicker defaultValue={moment(timeInMs, dateFormat)} />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="sale-finish-hour">
                      <TimePicker defaultValue={moment(hm, format)} format={format} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </div>
      <div className={style.label_input}>Edition size</div>
      <div className={style.sale__container}>
        <Row>
          <Col md={12}>
            <Radio.Group onChange={onRadioChangeSecond} value={radioLicense}>
              <Space direction="vertical">
                <Radio value="single">Single license</Radio>
                <Radio value="limited">Limited license</Radio>
                <Radio value="unlimited">Unlimited license</Radio>
              </Space>
            </Radio.Group>
          </Col>
          <Col md={12}>
            {radioLicense === 'limited' && (
              <div>
                <Form.Item
                  label="Choose amount"
                  name="amount"
                  rules={[{ required: true, message: 'Please input the amount' }]}
                >
                  <InputNumber className={'input-number'} type={'number'} name="transaction" min={1} max={10} defaultValue={3} />
                </Form.Item>
              </div>
            )}
          </Col>
        </Row>
      </div>
      <div className={style.title__container}>
        <h2>Income share</h2>
        <div>
          <div className={style.switch}>
            <Form.Item name="switch" style={{ margin: '0' }}>
              <Switch onChange={onSwitch} />
            </Form.Item>
            <span>Set Later</span>
          </div>
        </div>
      </div>
      <div>
        <Row gutter={20}>
          <Col md={14}>
            <Form.Item name="user">
              <Select
                style={{ width: '100%', fontSize: 'Helvetica' }}
                placeholder="Choose user"
                optionFilterProp="children"
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">
                  <div className={style.avatar}>
                    <Avatar size={25} icon={<img src="/icons/avatars/ava-1.png" alt="" />} />
                    <p>User 1</p>
                  </div>
                </Option>
                <Option value="2">
                  <div className={style.avatar}>
                    <Avatar size={25} icon={<img src="/icons/avatars/ava-2.png" alt="" />} />
                    <p>User 2</p>
                  </div>
                </Option>
                <Option value="3">
                  <div className={style.avatar}>
                    <Avatar size={25} icon={<img src="/icons/avatars/ava-3.png" alt="" />} />
                    <p>User 3</p>
                  </div>
                </Option>
                <Option value="4">
                  <div className={style.avatar}>
                    <Avatar size={25} icon={<img src="/icons/avatars/ava-4.png" alt="" />} />
                    <p>User 4</p>
                  </div>
                </Option>
                <Option value="5">
                  <div className={style.avatar}>
                    <Avatar size={25} icon={<img src="/icons/avatars/ava-5.png" alt="" />} />
                    <p>User 5</p>
                  </div>
                </Option>
                <Option value="6">
                  <div className={style.avatar}>
                    <Avatar size={25} icon={<img src="/icons/avatars/ava-6.png" alt="" />} />
                    <p>User 6</p>
                  </div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              name="percent"
              rules={[{ required: true, message: 'Please input the percent' }]}
            >
              <Input onChange={onChange} placeholder="%" />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Button style={{ width: '100%' }} className="btn btn-rounded-white-black-border">
              Set share
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SaleSetup;
