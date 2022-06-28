import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Space } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { requiredRule, inputNormalize, emailRule, hash } from 'core/helpers';
import { useSubmit } from 'core/hooks';
import { AuthenticationServices } from 'core/services';
import { loginSuccess } from 'core/actions';
import styles from './styles.module.scss';

interface IProps {
  onSignUp: () => void;
  onRecovery: () => void;
  onClose: () => void;
}

type TFormValues = { username: string; password: string };

const SignInForm: FC<IProps> = ({ onSignUp, onRecovery, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const initialValues: TFormValues = { username: '', password: '' };
  const { clearError, isSubmitting, submit, errorCode } = useSubmit();

  const handleSubmit = (values: TFormValues): void => {
    submit(
      AuthenticationServices.signIn,
      { username: values.username, passwordHash: hash(values.password) },
      (response: string) => {
        dispatch(loginSuccess(response));
        onClose();
      },
    );
  };

  return (
    <Form
      layout="vertical"
      name="signIn"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFieldsChange={clearError}
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="username"
        normalize={inputNormalize}
        rules={[requiredRule('Enter email'), emailRule('Enter correct email')]}
      >
        <Input
          style={{
            borderRadius: '5px',
            borderColor: 'black',
            fontFamily: 'Arial',
          }}
          size="large"
          maxLength={100}
          // prefix={<MailOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        normalize={inputNormalize}
        rules={[requiredRule('Enter password')]}
      >
        <Input.Password
          style={{ borderRadius: '5px', borderColor: 'black', fontFamily: 'Arial' }}
          type="password"
          size="large"
          maxLength={50}
          // prefix={<LockOutlined />}
        />
      </Form.Item>
      <Space className={styles.block}>
        <div className={styles.buttonsWrapper}>
          <Button
            className={`btn-rounded-black ${styles.button}`}
            style={{ marginRight: '10px' }}
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
          <Button
            className={`${styles.button} btn-rounded-white-black-border`}
            type="default"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            className={`btn-rounded-small-white-border-black-text ${styles.signUpBtn}`}
            type="link"
            disabled={isSubmitting}
            onClick={onSignUp}
          >
            Sign Up
          </Button>
          <Button type="link" disabled={isSubmitting} onClick={onRecovery}>
            Recovery
          </Button>
        </div>
      </Space>
      {errorCode === 'INCORRECT_CREDENTIALS' ? (
        <div className="error_message">{t(`Either email or password is incorrect.`)}</div>
      ) : null}
    </Form>
  );
};

export default SignInForm;
