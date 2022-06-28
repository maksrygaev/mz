import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ellipseString, urlRule } from 'core/helpers';
import style from './styles.module.scss';

interface IProps {
  item: any;
  img: any;
  foundElement: any;
  onSubmitDelete: (values: any, clear: any) => void;
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
}

const SocialNetworkListItem: React.FC<IProps> = ({
  item,
  img,
  foundElement,
  onSubmitDelete,
  onSubmit,
  isSubmitting,
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} initialValues={{ name: '', link: '' }} onFinish={onSubmit}>
      <Row gutter={5} className={style.modalNetworks__item} key={item.link}>
        <Col span={6} className={style.modalNetworks__networkPreview}>
          <span>{img?.icon}</span>
          <p>{item.name}</p>
        </Col>
        <Col span={15}>
          {foundElement && (
            <a rel="noreferrer" target="_blank" href={foundElement.value}>
              {ellipseString(foundElement.value, 38)}
            </a>
          )}
          {!foundElement && (
            <Form.Item name={item.name || undefined} rules={[urlRule('Enter correct url')]}>
              <Input placeholder="Social url" />
            </Form.Item>
          )}
        </Col>
        <Col span={3}>
          {foundElement && (
            <Button
              htmlType="submit"
              onClick={() => onSubmitDelete(foundElement, form.resetFields)}
              disabled={isSubmitting}
            >
              <CloseOutlined />
            </Button>
          )}
          {!foundElement && (
            <Button htmlType="submit" disabled={isSubmitting}>
              <CheckOutlined />
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default SocialNetworkListItem;
