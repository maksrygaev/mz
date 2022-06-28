import { FC } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import { CredentialsServices } from 'core/services/credentials';
import { useSubmit } from 'core/hooks';
import { requiredRule, inputNormalize, hash, getQueryParams } from 'core/helpers';

interface IProps { onClose: () => void; onConfirmSuccess: () => void }
type TFormValues = { password: string;};

const ConfirmForm: FC<IProps> = ({ onClose, onConfirmSuccess }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const initialValues: TFormValues = { password: '' };
  const { clearError, isSubmitting, submit, errorCode } = useSubmit();

  const handleSubmit = (values: TFormValues): void => {
    // @ts-ignore
    const {id, code} = getQueryParams();
    submit(
      CredentialsServices.confirm,
      {confirmationCode: code, credentialID: id, passwordHash: hash(values.password)},
      () => onConfirmSuccess(),
    );
  };

  return (
    <Form
      layout="vertical"
      name="confirm"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFieldsChange={clearError}
      requiredMark={false}
    >
      <Form.Item
        label="New password"
        name="password"
        normalize={inputNormalize}
        rules={[requiredRule('Enter password')]}
      >
        <Input.Password
          type="password"
          size="large"
          maxLength={50}
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Repeat new password"
        name="repeatPassword"
        normalize={inputNormalize}
        rules={[requiredRule('Enter password')]}
      >
        <Input.Password
          type="password"
          size="large"
          maxLength={50}
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Space style={{ paddingTop: '15px' }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>Confirm</Button>
        <Button type="default" disabled={isSubmitting} onClick={onClose}>Cancel</Button>
      </Space>
      {errorCode ? <div className="error_message">{t(`errors:${errorCode}`)}</div> : null}
    </Form>
  );
};

export default ConfirmForm;
