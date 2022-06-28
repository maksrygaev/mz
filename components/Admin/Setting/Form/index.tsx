import React, { FC } from 'react';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { useSubmit } from 'core/hooks';
import SettingServices from 'core/services/setting';

const { TextArea } = Input;

interface IProps {
  setting: any;
  onSuccess: () => void;
}

const SettingForm: FC<IProps> = ({ setting, onSuccess }) => {
  const { isSubmitting, errorCode, submit } = useSubmit();
  const initialValues = {
    ...setting,
    value: setting.type === 'Boolean' ? setting.value === 'true' : setting.value,
  };
  const handleOnSubmit = (values: any) => {
    const data = { id: setting.id, description: values.description, value: values.value };
    submit(SettingServices.update, data, onSuccess);
  };

  return (
    <Form name="SettingForm" layout="vertical" initialValues={initialValues} onFinish={handleOnSubmit}>
      <Form.Item name="name" label="Parameter">
        <Input disabled />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea />
      </Form.Item>
      {setting.type === 'String' && (
        <Form.Item name="value" label="Value" rules={[{ required: true, message: 'Enter Value' }]}>
          <Input />
        </Form.Item>
      )}
      {(setting.type === 'Integer' || setting.type === 'Decimal') && (
        <Form.Item
          name="value"
          label="Value"
          rules={[{ type: 'number', required: true, message: 'Enter correct Value' }]}
        >
          <InputNumber className={'input-number'} type={'number'} />
        </Form.Item>
      )}
      {setting.type === 'Boolean' && (
        <Form.Item name="value" label="Value" valuePropName="checked">
          <Checkbox>Enable</Checkbox>
        </Form.Item>
      )}
      {errorCode && <div className="form-message-error">{errorCode}</div>}
      <div className="ilc-buttons-group ilc-buttons-group_right">
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default SettingForm;
