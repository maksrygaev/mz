import React, { FC } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useSubmit } from 'core/hooks';
import { ProductsServices } from 'core/services';
import ProductBlock from '../../../Site/ProductDetail/ProductBlock';
import ProductApprove from '../../../Site/ProductDetail/ProductApprove';

const { TextArea } = Input;

interface IProps {
  setting: any,
  onSuccess: () => void;
}
const ProductsForm: FC<IProps> = ({ setting, onSuccess }) => {
  const { isSubmitting, errorCode, submit } = useSubmit();
  const initialValues = setting;
  const handleOnSubmit = (values: any) => {
    const data = { id: setting.id, description: values.description, name: values.name };
    submit(ProductsServices.update, data, onSuccess);
  };

  const handleSuccess = () => {
    message.success('Product was approved');
  }

  return (
    <Form name="SettingForm" layout="vertical" initialValues={initialValues} onFinish={handleOnSubmit}>
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea />
      </Form.Item>
      {(setting.status === 'Moderation')? (
        <ProductBlock>
          <ProductApprove product={setting} onSuccess={handleSuccess} />
        </ProductBlock>
      ) : null}
      {errorCode && <div className="form-message-error">{errorCode}</div>}
      <div className="ilc-buttons-group ilc-buttons-group_right">
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default ProductsForm;
