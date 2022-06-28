import React, { FC } from 'react';
import { Button, Form, Input, message } from 'antd';
import {ProductsServices} from "core/services";

interface Props {
  loadData: () => void;
  closeModal: () => void;
  product: any;
}

const { TextArea } = Input;

const ModalProductReject: FC<Props> = ({loadData, closeModal, product}) => {
  const title = 'Please describe the reason';
  const initialValues = {reason: ''};

  const handleRejectProduct = (values: any) => {
    const params = {id: product.id, reason: values.reason};
    ProductsServices.reject(params)
      .then(() => {
        message.success('Product was rejected');
        loadData()
        closeModal()
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <h3>{title}</h3>
      <Form initialValues={initialValues} onFinish={handleRejectProduct}>
        <Form.Item rules={[{ required: true, message: title }]} name={'reason'}>
          <TextArea name={'reason'}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType={'submit'}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalProductReject;