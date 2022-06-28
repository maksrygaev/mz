import React, { FC, useState } from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import { emailRule, inputNormalize, requiredRule, confirmationCodeRule, passwordRule, hash } from 'core/helpers';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useSubmit } from 'core/hooks';
import { CredentialsServices } from 'core/services/credentials';
import { errors } from 'core/constants/errors';
import styles from './styles.module.scss'

interface IProps {
  onSignIn: () => void;
  onClose: () => void;
}
type TFormValues = { username: string; code: string };
type TPasswordChangeFormValues = { password: string; repeatPassword: string; recoveryCode: string };

const RecoveryForm: FC<IProps> = ({ onSignIn, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [credentialID, setCredentialID] = useState(0);
  const [userName, setUserName] = useState('');
  const [passwordsEquality, setPasswordsEquality] = useState(true);
  const [form] = Form.useForm();
  const initialValues: TFormValues = { username: '', code: '' };
  const initialPasswordValues: TPasswordChangeFormValues = {
    recoveryCode: '',
    password: '',
    repeatPassword: '',
  };

  const { clearError, isSubmitting, submit, errorCode, errorMessage } = useSubmit();

  const handleSubmit = (values: TFormValues): void => {
    submit(CredentialsServices.recovery, { value: values.username }, credentialID =>
      onFinishSubmitting(values, credentialID),
    );
  };

  const onConfirmSuccess = (): void => {
    message.info('Password changed');
    onClose();
  };

  const onFinishSubmitting = (values: TFormValues, credentialID: number): void => {
    setIsSuccess(true);
    setUserName(values.username);
    setCredentialID(credentialID);
  };

  const handleSubmitPasswordChange = (values: TPasswordChangeFormValues): void => {
    // @ts-ignore
    if (values.password === values.repeatPassword) {
      setPasswordsEquality(true);
      submit(
        CredentialsServices.confirm,
        {
          confirmationCode: values.recoveryCode,
          credentialID,
          passwordHash: hash(values.password),
        },
        () => onConfirmSuccess(),
      );
    } else {
      setPasswordsEquality(false);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    const error = errors.find(err => err.code === errorCode);
    return error?.message || '';
  };

  if (isSuccess) {
    return (
      <Form
        layout="vertical"
        name="confirmPassword"
        form={form}
        initialValues={initialPasswordValues}
        onFinish={handleSubmitPasswordChange}
        onFieldsChange={clearError}
        autoComplete={"off"}
        requiredMark={false}
      >
        <p>We've sent you a recovery code to {userName}.</p>
        <p>Please, enter the code below to set a new password.</p>
        <Form.Item
          label="Enter recovery code"
          name="recoveryCode"
          normalize={inputNormalize}
          rules={[
            requiredRule('Enter recovery code'),
            confirmationCodeRule('Recovery code does not accept special chars'),
          ]}
        >
          <Input
            value={recoveryCode}
            onChange={({ target: { value } }) => setRecoveryCode(value)}
            style={{ borderRadius: '5px', borderColor: 'black', fontFamily: 'Arial' }}
            maxLength={6}
            size="large"
            autoComplete="off"
            type={"text"}
            suffix=" "
          />
        </Form.Item>
        <Form.Item
          label="New password"
          name="password"
          normalize={inputNormalize}
          rules={[
            requiredRule('Enter password'),
            passwordRule(
              'Рassword should be at least 8 characters long and contain upper and lower case letters, numbers and special characters',
            ),
          ]}
        >
          <Input.Password type="password" size="large" maxLength={50} prefix={<LockOutlined />} autoComplete={'new-password'} />
        </Form.Item>
        <Form.Item
          label="Repeat new password"
          name="repeatPassword"
          normalize={inputNormalize}
          rules={[
            requiredRule('Enter password'),
            passwordRule(
              'Рassword should be at least 8 characters long and contain upper and lower case letters, numbers and special characters',
            ),
          ]}
        >
          <Input.Password type="password" size="large" maxLength={50} prefix={<LockOutlined />} autoComplete="off" />
        </Form.Item>
        <Space style={{ paddingTop: '15px' }}>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Confirm
          </Button>
          <Button type="default" disabled={isSubmitting} onClick={onClose}>
            Cancel
          </Button>
        </Space>
        {errorCode ? <div className="error_message">{getErrorMessage(errorCode)}</div> : null}
        {!passwordsEquality ? <div className="error_message">Passwords are not equal</div> : null}
      </Form>
    );
  }

  return (
    <Form
      layout="vertical"
      name="recovery"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFieldsChange={clearError}
      requiredMark={false}
    >
      <Form.Item
        // label={<AuthValueLabel value={authValueType} onChange={type => setAuthValueType(type)} />}
        label="Email"
        name="username"
        normalize={inputNormalize}
        rules={[requiredRule('Enter email'), emailRule('Enter correct email')]}
      >
        <Input
          style={{ borderRadius: '5px', borderColor: 'black', fontFamily: 'Arial' }}
          size="large"
          maxLength={100}
          prefix={<MailOutlined />}
        />
      </Form.Item>
      <div className={styles.block}>
        <Button
          className={`${styles.btn} btn-rounded-black`}
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
        >
          Continue
        </Button>
        <Button
          className={`${styles.btn} btn-rounded-white-black-border`}
          type="default"
          disabled={isSubmitting}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="link" onClick={onSignIn}>
          Sign In
        </Button>
      </div>
      {errorCode ? (
        <>
          {errorCode === 'NOT_EXIST_CREDENTIAL' ? (
            <div className="error_message">{errorMessage}</div>
          ) : (
            <div className="error_message">{getErrorMessage(errorCode)}</div>
          )}
        </>
      ) : null}
    </Form>
  );
};

export default RecoveryForm;
